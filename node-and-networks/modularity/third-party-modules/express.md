# Express

- [Express](#express)
  - [Introduction](#introduction)
  - [the callback for a route](#the-callback-for-a-route)
    - [The properties of the request object](#the-properties-of-the-request-object)
      - [Some easy properties](#some-easy-properties)
      - [req.params](#reqparams)
    - [The properties of the response object](#the-properties-of-the-response-object)
  - [middleware](#middleware)
    - [adding middleware as an extra argument](#adding-middleware-as-an-extra-argument)
    - [adding middleware with server.use()](#adding-middleware-with-serveruse)
  - [Creating a 404 with server.use()](#creating-a-404-with-serveruse)
  - [Error handling functions](#error-handling-functions)

## Introduction

Express is an unopinonated framework for web servers. 

The basic typical express workflow looks like this:

```javascript
const express = require('express')

const server = express()

server.get(/*route as a string, callback(s)*/)
server.use( /*callback*/ )
server.listen(/*port, optional callback, e.g. one which consoles logs a confirmation*/)
```

express is imported as a function. Calling it creates an object, with a number of methods. Some of these methods, like get() above, register routes on the server. If you wanted to use a post request, you would use the post() method. listen(), then, is the function that actually makes the server go live. 

## the callback for a route

The functions like server.get() and server.put() take a variable number of arguments. The _last_ argument should be a callback that represents what to do if the route is used:

```javascript
server.get("/", homeRoute)

function homeRoute(req, res, next) {

}
```

This function should take three parameters, req, res and next - express counts parameters to work out what functions are for, so this matters.

req and res are objects representing the request and response respectively; next is a function that tells express to handle the next thing, e.g. to proceed to error handling.

### The properties of the request object
Clearly, there's a lot to list here; furthermore, these properties depend on whether any middleware has changed them. 

#### Some easy properties

|property|description|
|-|-|
|req.body|contains key-value pairs of the information from the body. By default it is undefined - it is only populated if you use body-parsing middleware like express.json() or express.urlencoded()
|req.cookies|gets cookies. Requires the cookie-parser middleware|
|req.method|string representing http method|
|req.query| an object representing the query string in the request url (the bit after ?)|
|req.get| get a specific header. ```req.get.content-type``` |

#### req.params

Express has this really neat system for letting you establish some branching in your routes. If you use a colon in the route, you can then use req.params to parse it

```javascript
server.get('/api/:number', (req, res, next) => {
    try {
        const bazoombas = new Array(+req.params.number).fill(null).map(() => "bazoomba!").join("\n")
        res.status(200).send(bazoombas)
    } catch {
        res.status(400).send("couldn't parse number into number")
    }
})
```

### The properties of the response object

|property|description|
|-|-|
|res.cookie()| add a cookie - check [the docs](https://expressjs.com/en/api.html#res.cookie) for details|
|res.clearCookie()| ask a browser nicely to clear the cookie you describe|
|res.end()| In express, end() is used to end the response __prematurely__ |
|res.send(arg)| sends arg, which can be of any type, and finished the response. Detects appropriate content-type header depending on value of argument. |
|res.redirect(code, path)| redirects to another path, often in your router but can also be full-fledged urls to external sites. Typically, the code is 302, for redirect |
| res.status(n) | sets the response status code. This function also returns res, so it can be chained: ```res.status(200).send("happy days")```|
| res.set(obj) | Sets the response headers. To set headers one by one, use res.append() |


## middleware
The cool thing about express is that it passes your requests through chains of functions, until res.send() or something similar is called. The functions that come before your own handlers that do this are typically called _middleware_, and you might use middleware as a substitute for guard clauses. Middleware can either be registered on a specific route, or for all routes. Let's first look at using it in a specific route

### adding middleware as an extra argument

```javascript
server.post('add-photo', authenticate, addPhoto)
```

In this example, authenticate could either be a function you wrote yourself, or a third-party function. Just like the handlers we considered above, authenticate should have a req, res and next parameter. It will typically work by changing the properties of req and res before calling next() or res.send() (for instance if authentication failed).

### adding middleware with server.use()

You can also register middleware with server.use(). This means that the middleware will be called before the final callback on all routes following the specific call to server.use().

Order really matters here - server.use() must be written before the http-method function, or that function won't use it. In this way, you can chunk your code. 

## Creating a 404 with server.use()
You can also use server.use() to create a 'catch-all' function for lost requests at the end of your code:

```javascript
server.use((req, res, next) => {
    res.status(404).send("we did not recognise the route")
})
```

## Error handling functions

You can also create middleware to handle errors. This middleware is formally distinguished from other middleware by the fact that it has four arguments, not three: req, res, next and __err__. You should add it using server.use() at the __end__ of your program.

```javascript
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

How a function like this gets called depends on the kind of error. For a _syncronous_ error you need do nothing; express will catch it and use the error-handling middleware. For an asynchronous error, you need to give the error object to next() as an argument, e.g.

```javascript
try {
    const p = "q"
    p = "!p"
} catch(err) {
    next(err)
}
```