# React

React is a frontend framework for manipulating the DOM. It doesn't add new functionality, rather, it increases productivity for jobs that could be done without it. Vanilla DOM manipulation is 'imperative': you must tell the DOM to a larger number of smaller things to achieve an overall effect. React abstracts over this to allow a 'declarative' style: you can, to a greater extent, simply say what you want. 

## Where React fits into the tech stack

### 1. In JavaScript files (mostly)
- React projects are written in JavaScript files in JavaScript. 
- They add some syntactic sugar called JSX that lets you write html-looking things in these JavaScript files. 
- There is a single .html file, containing a wrapper element typically called App; the React content will be injected into this element. 
- For that reason it is possible to use React in only a portion of your website, but I think that this is not the typical React workflow


### 2. On the backend (typically)
- React is an NPM package, and it normally exists on the backend. 
- When files need to be deployed, React transpiles them using Babel into vanilla JavaScript. 
- React also provides a testing server, which you can launch with npm start in a react app. 
- It is possible to use a frontend package to render React on the frontend, but this isn't recommended.

## How to start a React project

You can run npx create-react-app <app-name>. It will create a new folder with the name of your app and a git repository. The folder will contain a number of files, many of which you can delete. In the public folder you'll find the basic html and css boilerplate - after cleaning this up, you're unlikely to touch this much. The src folder is where the real magic happens. 

## Project structure: index.js
this is the file that injects the App (see next section) component into into your html. You don't need to touch it. It uses this code:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

```

Basically reactDom.render() takes two arguments: the first is the thing to render, and the second is the place to render it. The first argument we see here is an element created with JSX syntax: more anon.

Note that this code uses the ES6 module syntax - the interpretation of that is handled by the weighty react package you installed. 

## Project structure: app.js
If you open app.js, you'll see that app is a function, like any other. However, because we're using JSX, we can use this function as if its a html tag. One thing to note in the example from index.js is the closing tag after ```<App```. Unlike in HTML, in JSX a closing tag is necessary for single-tag elements.

Another thing to note is that App is capitalised - React components use PascalCase not camelCase. 

The default version of App contains a return statement, followed by a (), which contains multiple lines of code. This pattern threw me at first - what was this () doing, and how could you return multiple lines? Well, it turned out that each of these questions answered the other. () was doing it's vanilla JavaScript job of grouping values: by grouping values like this, you could return a multi-line value without breaking your code.

Note, though, that just because brackets let you return a value across multiple lines, they don't let you return multiple values. For this reason, the components returned by a component must all be packaged into a single wrapper component, often a div. 

## JSX gotchas
JSX is some syntactic sugar on top of the React core. It lets you write function calls for React components as if they were html elements (but with a few important differences). JSX is so prevalent that you are unlikely to see React components being used without JSX, as simple functions.

You _enter_ JSX is a JavaScript file with <, and leave it with >. A JSX component can go inside another, as we saw in the example from index.js above. 

### JSX and JavaScript
Inside JSX, you can do simple JavaScript if you enclose the JavaScript with curly braces {}. Specifically, a curly brace can include _expressions_, but not statements. Expressions are unresolved bits of code that resolve to a single value. Statements are complexes of expressions, and do not resolve to a single value. To see the difference, consider these two styles of conditional:

```javascript
const expression = true ? true : false
if (true) {
    statement = true
} else {
    statement = false
}
```

In the ternary, the variable assignment applies to the whole conditional. This is because ternaries resolve to single values: they are expressions. if-else statements, on the other hand, are more scalable, and they do not resolve to a single value. We could have done something completely unrelated in the else {} clause. If-else statements are statements.And note that, unlike in some templating languages like Jinja2, you can't use the information from one curly brace to talk to another and thereby create statements.

Once JSX arrives at a stable JavaScript value in curly braces, it interpolates the value into the JSX. This lets you do things like this:

```jsx
const names = ['Ivo', 'James', 'Kat']
<App>
    {names.map(name => <Name person={name}/>)}
</App>
```
JSX finds an array of Name components, and puts them straight into App.

### JSX syntax vs HTML syntax
JSX syntax is designed to be html-_like_, but it has a few important differences. 

1. Every component in JSX can be either self-closing or double-tagged, it's the programmer's choice at time of use.
2. in JSX single-tag components must close with a /, which is optional in HTML
3. 'props', the parts of JSX corresponding to HTML attributes, must use camelCase and often have different names. For instance, class in html is `className` in JSX.

## State and change in a React app
The thing that distinguishes a framework from a library is inversion of control: when using a framework, you have to do things as the framework wants you to. React is a framework, and when it comes to managing change in your applications, this becomes salient.

Let's first think about what will happen if you try to manage change as you would if you weren't using a frontend framework. 

- conditional re-rendering
- state is managed by react
- closures and setState