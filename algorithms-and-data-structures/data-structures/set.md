# The set

A set is an unordered list with no duplicate items.

The typical use for a set is to simply check for the presence of an item.

## Classic methods

|method|purpose|In ES6 implementation?
|-|-|-|
|has|returns boolean. Checks containment|y|
|values|displays contents of the set|y|
|add|Adds an element if it doesn't already exist|y|
|remove|Removes an element|y - called delete|
|size|returns size of collection|y|
|union|combine sets and leave out any duplicates. End up with a set which is greater than the mean of its contributors|

## Implementation

### ES6 Set
There is a data-type called Set which contains some, but not all, of the classic features of sets. Use it like this:

```javascript
const mySet = new Set()
mySet.add(1)
mySet.add([1, 2, 3]) // not only primitives, any data type
mySet.has(1) // true
mySet.has([1, 2, 3]) // they are different arrays
```