# Stacks

A stack is a last in first out data structure.

## Traditional functions

|name|purpose
|-|-|
|push|add to the top of the stack|
|pop|remove from the bottom of the stack|
|peek|display the top element of the stack|
|length or size|see the size|

## Implementation

### Arrays
Arrays and strings have methods that mean you could just treat them like stacks.

Here's an example of using stacks to discover palindromes

```javascript
function palindromeStack(word) {
    const stack = []
    for(let i = 0; i < word.length; i++) {
        stack.push(word[i])
    }

    let reverseStack = ""
    for(let i = 0; i < word.length; i++) {
        reverseStack += stack.pop()
    }
    return reverseStack === word
}
```

In practice there are easier ways to do this, like using arrays as arrays (reverse() function anyone? split("") ?) but this is language-agnostic and comparatively low-level. 

### with a class
Creating a stack class in JavaScript is useless in practice, because arrays are fine, but still interesting.

```javascript
const Stack = function() {
    this.count = -1; // 0-indexing.
    this.storage = {};

    this.size = function() {
        return this.count
    }

    this.peek = function() {
        return this.storage[this.count]
    }


    this.pop = function() {
        if (this.count >= 0) { 
            // delete this.storage[this.count] // space-saver
            this.count--
            return this.storage[this.count] 
            }
        return "no elements on stack"
    }

    this.push = function(element) {
        // in example he changes count after reassignment, because he initialises count to 0
        this.count++
        this.storage[this.count] = element
        return element
    }

}
```

You can then use this code with

```javascript
const myStack = new Stack()
myStack.push("hello world")
// etc.
```