CSS variables let you keep your code dryer, and since CSS tends towards chaos, this is really desirable. There are a few key concepts to understand:

- how css handles values which are undefined at a particular point (it just ignores them, and uses a fallback if one is available).
- how specificity and inheritance can account for scope (certain elements inherit from others - all elements inherit from the * selector, so this can function as a global scope).


You define variables inside selector rules with the double-dash:

* {
  --myVar: 0.5;
}


You use variables with the var function:

.box {
  opacity: var(--myVar);
}


You can set fallbacks for variable when you call them, by giving a second argument to the var function:

.box {
  opacity: var(myVar, 1);
}


You can use variable inside variable declarations to make composite variables:


* {
  --backgroundColour: hsl(20, var(--muted, 60%), 50%);
}


If one of these variables is undefined, CSS will use the fallback. But if you later define --muted in a more local scope, for instance for a hover element, then it will take effect. The only gotcha is that you have to reapply the colour-rule for CSS to read it that way:


a:hover {
  --muted: 30%;
  background-color: var(--backgroundColour);
}