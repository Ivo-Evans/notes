# Express

Express is an unopinonated framework for web servers. 

The basic typical express workflow looks like this:

```javascript
const express = require('express')

const server = express()

server.get(/*route as a string, callback(s)*/)
server.use( /*callback*/ )
server.listen(/*port, optional callback, e.g. one which consoles logs a confirmation*/)
```

express is imported as a function = calling it creates an object, with a number of methods. Some of these methods, like get() above, register routes on the server. If you wanted to use a post request, you would use the post() method. listen(), then, is the function that actually makes the server go live. 

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

### adding middleware as an extra argument

### adding middleware with server.use()

## Creating a 404 with server.use()

### Error handling functions