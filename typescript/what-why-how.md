# TypeScript general intro

## What is TypeScript
TypeScript is a superset of JavaScript. It is a JavaScript-like language that 'compiles down' to JavaScript. All JavaScript code is valid TypeScript code, but the same does not hold in reverse. Because TypeScript adds features to JavaScript, a .ts file is generally not valid JavaScript. After writing .ts or .tsx files, the TypeScript compiler compiles them into vanilla js files. Ultimately, it is these files which you send to the browser or run with Node.


## Why does TypeScript exist

### 1. The problem
JavaScript was invented in 7 days to bring interactivity to the web. During it's early life, some very questionable design decisions were made... some might even call them...

```
'b' + 'a' + + 'a' + 'a' + 's'
```
(That's baNaNas for you. And to be honest, it's the least of it.)

A lot of people don't think JavaScript is a very 'serious' programming language. However, positioned, as it is, as the only language (until recently, that is) that compiles in the browser, it's had to shoulder a serious responsibility of being the pre-eminent language of the web. 


### 2. The solution
The goal of TypeScript is to make JavaScript more respectable, more rigorous, and more relatable to programmers coming from different backgrounds. 

The main way it does this is to add strong-typing to JavaScript. You declare the data-type of variables, parameters, return values and suchlike - if the data-type differs, the TypeScript compiler throws an error.

This isn't the only thing TypeScript does, however, A second thing is better integrating OOP into JavaScript. A third is bringing futuristic JavaScript features to modern use.

## How to use TypeScript

### Installation

TypeScript is a node package which should be installed globally with 

```
npm i -g typescript
```

If you're not sure if you've installed it, run `tsc -V`.

### Most basic use - compilation and quickly testing ts code

The best thing to do is to create an empty directory, put a .ts file in it, and then run `tsc <filename> -w`. If you have a tsconfig.json, you can omit the filename.  If you're testing React-specific typescript, you can run ```yarn create react-app --template typescript```, then yarn start as normal (or `npx create-react-app --template typescript` and `npm start`)

### Use in React apps

### typeScript JSON file