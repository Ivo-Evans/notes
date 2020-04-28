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
To run a test in tape, you must require tape in the JavaScript file, then call a testing method in the file and run the file as normal.

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
// while both test and t could be called anything, they are customary. This is how you'll find them in the docs, for instance.
```

The name given to the test function is like a header, and the assertions are like checkbox items. 

Here are some interesting methods of the t object taken from the [docs](https://www.npmjs.com/package/tape):

- t.equal
- t.deepEqual (for reference types)
- t.error (passes if there is __no__ error, otherwise uses first argument as error message)
- t.test (runs a test within a test - this doesn't create visual nesting, but you could use the features of the closure)
- t.match(str, regexp, message) (assert that str matches regexp)

## supertest

## nock

- tape
- supertest
- nock
- anything else?
