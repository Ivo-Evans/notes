## Modularity
A Node script has certain functionality - basically the functionality of fundamental JavaScript - automatically. O

n top of that, there are a series of 'core modules' that you don't need to install, but do need to require at the top of your script. Once you've required them, you can access the properties of the returned object. 

Thirdy, there are third-party modules, the packages we talked about earlier. 

And finally you can write multi-file programs by using the require keyword and pointing to files in your own filesystem.

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
