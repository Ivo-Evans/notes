# HTTP

http messages are how computers talk to each other. clients (aka user-agents) send http _requests_, and servers send http _responses_. http messages contain a _request line_ or _status line_ followed by a _head_, an empty line, and an optional _body_. They send their data as plain text. In http 1 this was a human-readable single message, where parts were distinguished by correct whitespace; in http 2 the process was optimised and is now unreadable.

## Request v.s. status line

Requests start with a request line and responses start with a status line.

### The request line

The first line of a https request is a request line. This contain's the request method, the url or address of the resource, and the protocol used.

There are 7 methods, but I'm just going to talk about four. These methods are all uppercase.

- GET
  - gets response from a server, like the contents of a html or css file.  
    GET /wiki/Main_Page http/1.1
- PUT
  - submits data to a server for storage. The data should be stored in the supplied URI, even if the URI needs to be created by the server to do this. PUT is supposed to be idempotent, meaning that multiple identical requests do not change the state of the server
- DELETE
  - requests that the server delete the information at the URI
- POST
  - requests that the server use the body (and information from the head) to update the website.

### The status line

The first line of a http _response_ is a status line. It contains the protocol, a status code, and a descriptive message, like this:

HTTP/1.1 200 OK

#### status codes

There are a lot of status codes, but they are grouped into families by their hundreds digit:

- 1xx: informational response
- 2xx: success
- 3xx: redirect
- 4xx: client error
- 5xx: server error

## the head of a http message

heads contain a series of key-value pairs. Keys are separated from values with colons. Pairs are separated from each other only with newlines. Here's an example:

```
Host: localhost:8000
Connection: keep-alive
Content-type: multipart/form-data
```

These headers are case-insensitive.

You can group header information into [four families](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers):

- General headers that apply to either request or response headers but with no relation to the data in the body
- Entity headers that contain information about the body of the resource, like content-length or content-type
- request headers
- response headers

The end of the head and the beginning of the body is indicated in http 1 with an empty newline.

### the Content-Type header

One header we used in particular was the content-type header. Because htttp sends the data in its body as plain text, and because it needs to be efficient, the body contains no information about how to read the body. On computers, operating systems usually work out how to read the plaintext in a file by looking at its extension, but in a http message there are no files. This is where the content-type header comes in, to specify what kind of data is being sent. It uses the MIME format.

A MIME-type looks like this:

`text/html`

The part before the / is the type, and the part after it is the subtype.

The default MIME type for a form submission is

`application/x-www-form-urlencoded`

In this case the keys and values are encoded in key-value tuples, where keys are separated from values by `=` and tuples from each other by `&`. This information is then sent in the _body_ of a POST request.
