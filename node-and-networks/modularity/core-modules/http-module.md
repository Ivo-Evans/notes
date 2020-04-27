# createServer().listen()

You can set up a node server with node's http module, although people often use Express instead. Here's an example with the http module:

```
const http = require('http');
const port = 3000;

http.createServer(router).listen(port, startMessage)

function router() {}
function startMessage() {console.log(`listening on ${host}${port}`)}
```

- first you require the http module, and assign it to the variable http.
- Then you can call its method createServer().
- createServer() takes a callback. It can also take an options object before the callback. The callback we give it is called the requestListener - it is a function that will be called every time a request is made. more anon.
- createServer() returns a <http.Server> object.
- We call server.listen() on this object. There are various patterns of parameters for server.listen(). Here we provide the port to listen on and a callback to be printed to the console once the server starts running.

# createServer()'s requestListener callback

This is the function router(). Here's how it might look:

```
function router(request, response) {
  if (request.url == "/") {
    response.writeHead(200, { "content-type": "text/html" })
    response.end(/* A string containing markup for homepage */)
  }
}
```

The router takes two arguments, a request object and a response object. These two objects are passed to the function by the server, so they have lots of real information in them. You can use the request object to get information about the http request, and you can use the response object to set information about the http response. Once the router function has finished executing, it uses the response object to make a http response.

There's way too much going on in these objects to talk about everything, but i'll highlight a few useful properties.

First, check out these properties of the request object:

- headers
- method // e.g. POST
- statusCode
- url
- on() // this is actually generic to node objects. It's how you add an event listener. You can use it to listen for all sorts of things, like "data", data being read from the http request body, and "error", something going wrong.

Next, check out these methods defined on the response object:

- writeHead()
  - takes two arguments, the first is the status code, and the second is an object containing headers, where both key and value are strings
- write()
  - writes the body of the http response
- end()
  - signals to the server that the requestListener() function can stop calling and the response() can be sent
  - sends whatever data it is provided as an argument as the body of the response

## Final notes

1. You can find all the methods available on the request and response objects in [the documentation for the http module](https://nodejs.org/api/http.html). The objects are instances of the http.clientRequest and http.serverResponse classes respectively. If you understand that, then you can understand all of the classes in the http module quite easily - there is only server, serverResponse, clientRequest and incomingMessage.

2. generally, the router function is in its own file, and it calls handlers as the antecedent of its conditionals which are in their own files too - so you have a server.js file, that requires router.js, and router.js, which requires either handlers.js or, more likely, many individual handler files.
