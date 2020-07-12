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
const myFunc = (x: number, y:number): number => { // You declare return value on line 1
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

You've basically got two options, defining a type and defining an interface. You define a type with the type keyword:

```
type myObj = {
    [index:string]: string
    // each kv pair in myObj will have a string which it uses as an index, and which corresponds to a string value
}

type myOtherObj = {
    myFirstProp: number;
    mySecondProp: (arg: number): boolean => {};
}
```

You can put semi-colons at the end of props in type definitions, or commas like in a JS object

## Interfaces

Often, when you can use a custom type, you can also use an interface. An interface, like a type definition, is not compiled down to JS - it is for type checking by the TS compiler(duck typing). You _define_ an interface with the `interface` keyword:

```
interface INames {
    first: string;
    second: string;
}
```

Notice that the interface keyword, unlike the type keyword, is not followed by `=`.

Interfaces do not need to begin with `I`, but very often do. Given the INames interface, we can use it as a filter on our assignments to describe the shape of objects:

```
const studentOne: INames = {first: "Adam", second: "Dangoor"}
const studentTwo: INames = {first: "Ivo", second: "McChulloch", third: "Evans Storrie"} // expected type error
const studentThree: INames = {first: 30, second: "wheats"} // expected error
```

You can make interfaces polymorphic by giving them parameters. I believe that this is what a 'generic' is (a generic interface).

## Optional properties

Both interfaces and types can have optional properties. You just need to put a ? before the colon:
```
type Person = {
    firstName: string;
    lastName?: string;
}

function greeter(person: Person) {
    return "hello"
}

greeter({firstName: "Ivo", lastName: "Evans"})
// A ok
```

Note that the fact that some properties can be optional in objects does not mean that you can optionally add extra properties:
```
type Person = {
    firstName: string;
    lastName?: string;
}

function greeter(person: Person) {
    return "hello"
}

greeter({firstName: "Ivo", lastName: "Evans", otherLastName: "Storrie"})
// not ok

type LiberalTypeOfPerson = {
    firstName: string;
    lastName?: string;
    [propName:string]: any;
}
// probably excessively liberal 

```
