

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
