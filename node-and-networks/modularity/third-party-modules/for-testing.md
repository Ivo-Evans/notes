# Testing

## tap-spec

tap-spec is an output formatter for ```tape```. You can use it in a script but it is better to use it in the command line via your package.json, by piping the results of your test command into tap-spec:

```
....
"main": "index.js",
    "scripts": {
        "test": "tape tests/*.test.js | tap-spec",
...
```

The [tape documentation](https://www.npmjs.com/package/tape) contains a long list of alternatives to tap-spec too.

## tape

Tape is the testing framework we used in the course. I guess it's an alternative to Mocha, Chai and Jest. tape itself is heavily influenced by another framework, node-tap. You could read articles comparing the two if you were interested.

### Running tests in tape
To run a test in tape, you must require tape in the JavaScript file, then call the testing method it provides in the file and run the file as normal.

tape also provides its own binary, as we saw above. The difference here is that the command can then utilize globbing: the tape command in the example above will run all files ending with ```.test.js``` in the ```tests``` directory.

### Writing tests in tape

- tape provides a function 
- the function then takes a name and a callback.
- you can rely on the callback's parameter having testing methods

```javascript
const test = require("tape")

test('init', (t) => {
    let num = 2;
    t.equal(num, 2, "Should return 2")
    t.notEqual(num, 3, "should not equal another number")
    t.end()
})
// while both test and t could be called anything, these names are customary. This is how you'll find them in the docs, for instance.
```

The first argument of test is like a header for the test, and the third arguments give to the assertions are like checkbox items. 

Here are some interesting methods of the t object taken from the [docs](https://www.npmjs.com/package/tape):

- t.equal
- t.deepEqual (for reference types)
- t.error (passes if there is __no__ error, otherwise uses first argument as error message)
- t.test (runs a test within a test - this doesn't create visual nesting in the output, but you could use the features of the closure)
- t.match(str, regexp, message) (assert that str matches regexp)

## supertest

Supertest is a tool for testing how well your server handles http requests and creates http responses. It:

- sends faked http requests to your server
- expects a certain response
- throws an error if it didn't get the expected response
- makes the response available as an object if it did get the response

You don't have to actually run your server - when you pass the server function to supertest, it calls it before sending the request.

Here's an example.

```javascript
const request = require('supertest');
const express = require('express');
 
const app = express();
 
app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});
 
request(app)
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .then(res => console.log(res)) // a big object with a lot of properties
  .catch(err => console.log(err)) // the relevant error, e.g. 'Expected content-length to be 15, instead got 16'
```

There are four basic steps here:
1. call request with our server function as an argument
2. make a http request to an endpoint with the relevant verb
3. say what you expect of the response
4. handle the result with then() and catch()

You don't have to do step 4 with promises - you can also use the .end function, and give it a callback with ```err``` and ```res```.

If you were integrating supertest with a testing framework like tape, you would handle its results in the .fourth stage:

```javascript
const test = require('tape') // New
const request = require('supertest')
const express = require('express')

const app = express()

app.get('/user', (req, res) => {
    res.status(200).json({ name: 'john' })
})

test('can make simple get request to user route', t => {
    request(app)
        .get('/user')
        .expect('Content-Type', /json/)
        .expect('Content-Length', '15')
        .expect(200)
        .then(res => {
            t.equal(res.status, 200, "returns a 200")
            t.equal(res.type, 'application/json', 'returns JSON')
            t.end()
        }) 
        .catch(err => {
            t.error(err)
            t.end()
        })
    })
```


## nock

Nock is a tool for testing how well your server makes http requests, and handles http responses. It does this by intercepting http requests coming from Node. Set up an interceptor by providing an origin name to the nock function:

```javascript
const nock = require('nock')
const pokeAPI = nock('https://pokeapi.co')
```

Interceptors are removed upon first use. You can either set up a new one for each test, or use the persist() method:

```javascript
const pokeAPI = nock('https://pokeapi.co').persist()
```

To test for routes, you use a method corresponding to the appropriate verb:

```javascript
pokeAPI
.get('api/v2/pokemon/ditto') // could take a second argument representing body of request
.reply(200, 'ditto here') // this second argument could also be an object representing JSON
```

The get method also accepts a callback which lets you use string-parsing functions on its parameter, like .includes()

If you want to add request headers, add them in an object as the second argument to nock()

