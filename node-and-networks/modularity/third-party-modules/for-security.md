# Security
I've covered two security strategies, for each of which I've used a different module. The first strategy is _encryption_. The second strategy is _signing_.

## Encrypting data
### The theory
You encrypt a string by applying a hashing algorithm to it. The idea is that, given the string, the algorithm will reliably create the same output, but that the input cannot be reverse-engineered from the output. 

Hashing algorithms are also deliberately convoluted to slow down their execution. This prevents brute-forcing a password once you have its hashed version. 

However, these two measures, one-way hashing and long encryption time, aren't enough, because hackers buy and, in some cases, make tables containing hashed versions of common passwords. To solve this problem, organisations add 'salt' to their passwords before they encrypt them. The salt is not publicised, but neither is it secret: it is typically appended to the end of the hash after it has been used to generate the hash. The function of the salt is just to make the hashed output different to the hashed output of an unsalted password. That way, even if a hacker has the hashed password and the salt, they will need to generate a salt-specific rainbow table of common passwords and _then_ do the comparison. If you further use random salt for each password, then each password will require a new rainbow table. Because hashing algorithms are deliberately slow, password-specific rainbow tables are prohibitively expensive.


### The practice

We used the library bcryptjs to encrypt passwords. Here's the syntax for encrypting a password:

```javascript
const bcryptjs = require("bcryptsj")
let password = "jim"

bcryptjs.genSalt(11, (err, salt) => {
    if (err) { handleError(err) }
    bcryptjs.hash(password, salt, (err, hash) => {
        if (err) { handleError(err) }
        password = hash
    })
}) 
// first argument to genSalt is number of rounds of salting. 10 is default for genSalt function. 
// Second argument is callback with salt
// when you have this salt you use password + salt with bcrypt.hash, which takes a callback; the second argument of the callback 
```

Because bcrypt uses one-way hashing, you can't decrypt passwords. When you want to compare an inputted password to its hashed and stored version, you have to encrypt the inputted password. bcryptjs provides a version with a callback and a version that returns a promise.

Promise version:

```javascript
bcryptjs.compare("jim", password)
.then(res => console.log(typeof res)) // "boolean"
.catch(err => console.log(err)) 
```

The callback version simply has an extra argument:

```javascript
bcryptjs.compare("jim", password, (err, res) => {
    if ( err ) { handleError(err) }
    console.log(typeof res) // "boolean"
})
```

## Signing data
### The theory
You _sign_ data when you want to give it away, and make it publicly available, but you want to make sure that nobody can _change_ it without you knowing. The context we encountered this in is stateless authentication: securely keeping a user logged in, without keeping any information about whether they're signed in on the server.

The basic principle is this. Create a _token_ which you can send out to the user which contains certain information, for instance,

```javascript
    {
        name: "",
        logged-in: "",
        iat: "", // issued at time: 
        exp: "" // expires
    }
```

These pieces of information are called 'claims', and cumulatively, are a payload. Use the payload plus a serverside _secret_ (a secret string) to generate a _signature_ which you send out along with the payload. The wannabbe hacker is free to change details of the payload they receive, but it won't help them. When they send you their modified token, you'll use its payload, in combination with your secret, to generate a new signature; if it doesn't match the signature that the hacker sent in, you know that the payload must have been modified. And while the hacker can freely modify the signature too, they have no hope of modifying it correctly, so that it matches up with the payload.

This strategy is called JSON web tokens, or JWTs ('jewts'); it's useful for all kind of rest APIs, from being logged in to websites to simple API data calls. 

JWTs have three parts, separated from each other by dots:

    meta-information.payload.signature

    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

People often mistakenly think that the first two parts are encrypted, because they look like it. A speaker at FAC just yesterday said that they were. But they aren't - they're simply base-64 encoded. This is an efficient way to represent text, but it isn't secure. You can turn any base-64 encoded string into a normally-encoded one in node with this:

```javascript
    Buffer.from(example, 'base64').toString()
```

You can also go to jwt.io

#### expiration v.s. manual logout
Stateless authentication is great for logins that you've planned to expire at a certain time, but isn't so straightforward for manually logging out. For instance, you might need to store a blacklist of forbidden tokens (or of their unique ids) which are still in date but which are marked as logged-out - but since you'd be storing things, it wouldn't be stateless authentication any more. 

Here's a meme I nicked from an [article on the topic](https://dev.to/_arpy/how-to-log-out-when-using-jwt-4ajm)

![jwt logout meme](../../memes/jwt-meme.jpg)

It's also worth noting that you shouldn't set very distant exp claims, because then you might expose your customer to CSRF, which just isn't very nice. 

### The practice

This involves three things: making, sending, and receiving/verifying.

#### make a token

We used the library jsonwebtoken to create tokens before sending them out in headers. 

Creating a JWT with jsonwebtoken is pretty simple. There's a synchronous and an asynchronous version, but the two are actually basically the same in this case. 

```javascript
const jwt = require('jsonwebtoken')
const payload = {
    user: "user mcuserson",
    loggedIn: true, 
}
const options = {
    expiresIn: '1h' // you can also use seconds if you like. 
}
const secret = process.env.SECRET || "ghw43u2332gher4w3pgnsre" // for example purposes
jwt.sign(payload, secret, options)
```

The library inserts an accurate iat claim, or issued-at-time claim, for you. 

Similarly, the jsonwebtoken library inserts the exp, or expiration, field for you, but only if you specify expiresIn in the optional options argument. According to the JWT spec, exp is the number of seconds since the epoch. Since this isn't convenient, our library lets you give expiresIn, and adds that on to the current time to make the exp claim.  

#### Send a token
Once you have created a token it is time to send it out. You should send it as a cookie. 

express has a [res.cookie() function](https://expressjs.com/en/api.html#res.cookie), and with Node's http module you can use setHeader. Let's focus on Express.  

The first argument of Express's res.cookie() is a string. In our case it should be ```'token'````. This is the key of the cookie. The second is the object to be the value of the token. The third is the options argument. For cookies, this argument is important. Observe the example:

```javascript
res
  .status(201)
  .cookie('access_token', 'Bearer ' + token, {
    expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours. This expiration is not, therefore, the jwt's validity's expiration.
  })
  .cookie('test', 'test')
  .redirect(301, '/admin')
  ```

#### receive and verify a token
You can use the express middleware cookie-parser, after npm installing it. 

If you're using it, you should be able to use ```req.cookies.token``` to get your token. 

#### bonus: use a token to make a request to a server