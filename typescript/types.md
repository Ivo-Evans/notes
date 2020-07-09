# Using types in TypeScript

## Inbuilt types
The central idea of TypeScript is to make types explicit. To this end, it recognises a number of common types automatically:

### Primitives
- boolean
- number
- string

### Reference types
- array
- tuple
- enum
- object

### Others
- any
- void
- null and undefined
- never

## Where to declare types
Variables should have their type declared:

```
let myNum: number = 0;
```

Functions can also have their parameter types declared, and their return value types declared: 

```
const myFunc = (x: number, y:number): number => { // You declare return value on line 1 ¯\_(ツ)_/¯
    return x + y;
}
const App: React.FC = ():JSX.Element => {}
// in the first example, params and return values are declared, but fn is not. In the second example, fn and return value is declared, but there are no params.
```

## Custom types
Types can be imported from objects, such as React.FC (functional component) or JSX.Element, and you can implement your own.


```
const App: React.FC = () => {}
```

### Interfaces

You can define your own type my making an interface. An interface is not compiled down to JS - it is for type checking by the TS compiler(duck typing). You _define_ an interface with the `interface` keyword:

```
interface INames {
    first: string;
    second: string;
}
```

Interfaces do not need to begin with `I`, but very often do. Given the INames interface, we can use it as a filter on our assignments to describe the shape of objects:

```
const studentOne: INames = {first: "Adam", second: "Dangoor"}
const studentTwo: INames = {first: "Ivo", second: "McChulloch", third: "Evans Storrie"} // expected type error
const studentThree: INames = {first: 30, second: "wheats"} // expected error
```
