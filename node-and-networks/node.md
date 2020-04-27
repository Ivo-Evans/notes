Node is a non-browser JavaScript environment. It uses the V8 Chromium engine.


# Associated software
## NVM
NVM stands for Node Version Manager and it is a way of installing specific versions of Node. I have found it extremely easy and straightforward.

## NPM
NPM stands for Node Package Manager and it is a way of installing _packages_ that you can use in your project. Some, like Express, are nothing more than JS scripts that make certain values available in your code. The values are normally available as an object returned from a function. Sometimes packages also do things like create new terminal commands, like Nodemon. Even nodemon is written in JavaScript.  

NPM packages are installed individually for each project with ```npm install exampleName```. Before you can run npm install, you need to use ```npm init```. This creates a ```package.json``` file.

The package.json is a hub for project administration. It includes:
- information about the project, such as contributors, website and license
- information about dependencies, i.e. modules that have been installed with NPM for this project
- command-line aliases that you can use from anywhere inside your project to execute a certain command from the root directory of your project

Of these three purposes, the second two are most interesting

### NPM and dependencies
As mentioned above, NPM installs dependencies locally, that is, in the root folder of your directory (in which you called npm init). This can be circumvented with the -g flag, which installs a package on your system as a whole, but we'll skip over that for now. 

The package.json stores dependencies as an object, with the _name_ of the dependency on the left, and the _version_ on the right. Specific versioning of dependencies is why packages are installed locally to each project.

There are two kinds of dependencies in NPM, dev dependencies, which are for use when developing the app, and dependencies *simpliciter*. You can install a *simple* dependency with npm i or npm install:

```
npm i express
```

You can install multiple dependencies at once by separating them with spaces:

```
npm i express bcrypt jsonwebtokens mixin dotenv
```

To install _dev_ dependencies, add the --save-dev or -D flag:

```
npm i -D jest supertest nodemon
```

The dependencies and dev dependencies have a different place in your package.json:

```
...
    "homepage": "https://github.com/fac19/week7-CRaKT#readme",
    "dependencies": {
        "bcryptjs": "^2.4.3",
        "ci": "^1.0.0",
        "dotenv": "^8.2.0",
        "express": "^4.17.1",
        "jsonwebtoken": "^8.5.1",
        "pg": "^8.0.2"
    },
    "devDependencies": {
        "nodemon": "^2.0.3",
        "prettier": "^2.0.4",
        "supertest": "^4.0.2",
        "tap-spec": "^5.0.0",
        "tape": "^4.13.2"
    }
}
```

### NPM and custom commands
There are two other interesting fields of a package.json, main and scripts:

```
   "main": "index.js",
    "scripts": {
        "test": "PGDATABASE=localtest tape tests/*.test.js | tap-spec",
        "dev": "nodemon server.js",
        "setupdb": "node db/build.js",
        "format": "prettier --write '**/*.{js,css,md}'"
    },

```

You can use these to allow custom commands for running your code. Therefore, instead of going to the right part of your directory and then typing ```node path/to/some/nested.js``` you can simply type  ```npm run dev``` and it will run the respective command for you.  

npm run ... should be your default way to run node scripts, or to use node package command-line tools like nodemon above. You can also use command-line logic in these commands. For instance, the test script defined above redefines the environment variable PGDATABASE. It's likely that the user will have a PGDATABASE defined in their .env, but since the _testing_ database is different to the production/development database, the PGDATABASE variable should be redefined when running tests, and ```npm run test``` lets you do that. 

```npm run``` has so many advantages that I think some people on my cohort don't even *know* you can use the node command to execute a particular script. 


## Yarn
Yarn is basically an alternative to NPM. Apparently it used to be faster, but is no longer appreciably so. Since NPM comes included with node and Yarn has to be installed, I've been using only NPM. 

Yarn also innovated with versioning somehow, and NPM responded by introducing the package-lock.json. All I know about the package-lock.json is that we're not supposed to touch it.

# Node itself and its design patterns

I've used Node to make servers, so that's my emphasis here.

## Modularity
Ok, so a Node script has certain functionality - basically the functionality of fundamental JavaScript - automatically. On top of that, there are a series of 'core modules' that you don't need to install, but do need to require at the top of your script. Once you've required them, you can access the properties of the returned object. Thirdy, there are third-party modules, the packages we talked about earlier. And finally you can write multi-file programs by using the require keyword and pointing to files in your own filesystem.

```javascript
const path = require("path") // a core module
const dotenv = require("dotenv") // a third-party module
const projectModule = require("./example-module") // .js is optional but ./ to indicate a filepath is not
```

### Exporting module code
So above we saw how to import code from another file you wrote. To _export_ it, you need to access the module object:

```javascript
module.exports = { functionOne, functionTwo }
```

### Importing with destructuring assignment
Above we saw an example of importing an entire module. You can also import a single one of a module's exports with destructuring assignment. I don't like doing this, because I think that the module name improves clarity, but some people do, so it is useful to know:

```javascript
const { function1 } = require("./example-module")
```


### The node core modules
I've only actually had cause to use a few of the node core modules. These are:

- path
- fs
- http
- url
- buffer
- process

Two others that I've used third-party alternatives for are

- crypto
- assert


You can see a full list of core modules in the node repl with 

```javascript
require("module").builtinModules
```

There's not that many. It's worth checking out. 

### Some third party modules

#### Security
I'm starting with the one I've understood best. I've covered two security strategies, for each of which I've used a different module. The first strategy is _encryption_. The second strategy is _signing_.

##### Encrypting data
###### The theory
You encrypt a string by applying a hashing algorithm to it. The idea is that, given the string, the algorithm will reliably create the same output, but that the input cannot be reverse-engineered from the output. 

Hashing algorithms are also deliberately convoluted to slow down their execution. This prevents brute-forcing a password once you have its hashed version. 

However, these two measures, one-way hashing and long encryption time, aren't enough, because hackers buy and, in some cases, make tables containing hashed versions of common passwords. To solve this problem, organisations add 'salt' to their passwords before they encrypt them. The salt is not publicised, but neither is it secret: it is typically appended to the end of the hash after it has been used to generate the hash. The function of the salt is just to make the hashed output different to the input. That way, even if a hacker has the hashed password and the salt, they will need to generate a salt-specific rainbow table of common passwords and _then_ do the comparison. If you further use random salt for each password, then each password will require a new rainbow table. Because hashing algorithms are deliberately slow, password-specific rainbow tables are prohibitively expensive for a hacker.


###### The practice

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

Because bcrypt uses one-way hashing, you can't decrypt passwords. When you want to compare an inputted password to its hashed and stored version, you have to encrypt the inputted password. But for whatever reason, doing that is syntactically cleaner than encrypting. There is a version with a _callback_, and a version which returns a _promise_

Promise version:

```javascript
bcryptjs.compare("jim", password).then(res => console.log(typeof res)) // "boolean"
```

The callback version simply has an extra argument:

```javascript
bcryptjs.compare("jim", password, (err, res) => {
    if ( err ) { handleError(err) }
    console.log(typeof res) // "boolean"
})
```

##### Signing data
###### The theory
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

###### expiration v.s. manual logout
Stateless authentication is great for logins that you've planned to expire at a certain time, but isn't so straightforward for manually logging out. For instance, you might need to store a blacklist of forbidden tokens (or of their unique ids) which are still in date but which are marked as logged-out - but since you'd be storing things, it wouldn't be stateless authentication any more. 

Here's a meme I nicked from an [article on the topic](https://dev.to/_arpy/how-to-log-out-when-using-jwt-4ajm)

![jwt logout meme](memes/jwt-meme.jpg)

###### The practice: make a token

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
secret = process.env.SECRET || "ghw43u2332gher4w3pgnsre" // for example purposes
jwt.sign(payload, secret, options)
```

The library inserts an accurate iat, or issued-at-time field, for you. 

Similarly, the jsonwebtoken library inserts the exp, or expiration, field for you, but only if you specify expiresIn in the optional options argument. According to the JWT spec, exp is the number of seconds since the epoch. Since this isn't convenient, our library lets you give expiresIn, and adds that on to the current time to make the exp claim.  

##### The practice: send a token
Once you have created a token it is time to send it out. You 


##### The practice: receive and verify a token

#### Testing

#### Development servers

#### postgres 

#### filesystem utilities (dotenv)

#### express

## Return values v.s. callbacks
![return values v.s. callbacks in node - drake meme](memes/meme.jpg)

