Promises are a way of writing asynchronous code. The idea is slightly different to callbacks. While callbacks call back with a function after some time has elapsed, promises return a mutable object _instantly_. The state of the object then changes depending on external APIs.

One way to generate a promise object is with the fetch() function. fetch() sends a request - by default, a get request - to the URL provided to it as an argument in its string.

  fetch('https://pokeapi.co/api/v2/pokemon/pikachu')

One function available for promise objects is then(). then() executes once the promise has been fulfilled 

  fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
  .then(data => 'do something with the callback\'s return')

then() takes a callback as an argument, and passes the result on. It can be chained:

    fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
    .then(data => data.json()) // json() converts a json-string into a json-formatted object
    .then(newData => console.log(newData.someProperty))


Another useful function that can be called on promise objects is catch(). This catches an error occurring at any point in the chain preceding the catch() call.

    fetch('')
    .then(data => data.jpon()) 
    .then(newData => console.log(newData.someProperty))
    .catch(errorText => console.log(errorText))


Next note the Promise.all() function. This takes an array of promise objects and returns a single promise object - you can call then() or another method on this promise object, and the argument given to the callback of then() will be an array of the resolved promises, or something like that. Look at this example, adapted from MDN:

    var resolvedPromisesArray = [Promise.resolve(33), Promise.resolve(44)];
    var p = Promise.all(resolvedPromisesArray).then(data => console.log(data));
    console.log(p);

    setTimeout(function() {
        console.log(p);
    });

    // logs, in order:
    // Promise { <state>: "pending" }
    // [33, 44] 
    // Promise { <state>: "fulfilled", <value>: Array[2] }


An inverse of Promise.all() is Promise.race(), which accepts whichever element of the iterable resolves first.