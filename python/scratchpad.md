
On p.19 of Pocket Python

## Naming conventions
- snake_case for most things
- CamelCase for classes
- UPPER_SNAKE_CASE for constants

## Data types
Python has types and subtypes. Types/subtyps are classes, and their instantiations are objects. You can also make your own types by making new classes. See this list for inbuilt types and subtypes:

- numeric
  - Integer
  - Float
  - Complex number (e.g. imaginary number)
- Boolean
- Sequence
  - String
  - List
  - Tuple
- Dictionary

I'm not clear whether these types, .e.g list, are subtypes of sequence, or if this is only a conventinal ordering; and I'm not sure if they're instances of their supertypes either.

To see the type of an object, you can use the `type()` function:

```
type(5) # <class 'int'>
```

### Numbers
Python has two division methods, divide and floor divide:
```
4/5 # 0.8
4//5 # 0
```


### Dictionaries
- keys should be strings
- square-bracket lookup works but dot access doesn't
- Add new keys with the assignment operator just like JS
- delete a key with the del keyword: `del my_obj['c']`
- Find the number of pairs with len(): `len(my_obj)`
- You can check whether a dictionary has a key with the    `in` keyword: `'a' in my_dict'
  - Naturally this only works for key lookup
- Get a list of keys: `list(iter(my_dict))`
- Iterate through keys of a dictionary: `for k in my_dict:`

## Variables
Variables are dynamically typed, so
- You don't declare variables before using them, you just use them, e.g. `my_var = 5`
- There are no restrictions on their data types

## Logic

Logic in python uses natural language(!)

### conditional

#### 'Ternary'

`x if y else z`

Notice that the antecedent is in the _middle_, the consequent is on the left, and the negation of the consequent is on the right. 

### disjunctive and conjunctive

```
x or y
x and y
```

Python uses short-circuit evaluation:

```
False and 2 # 2
False or 2 # False
```

### Negation

```
not 0 # True
```

## Operators
All operators seem to correspond to class methods, e.g. `+` corresponds to `__add__`.

### Comparison operators
You can chain them!

```
def five_to_ten(n):
    return 5 < n <= 10

five_to_ten(6) # True
five_to_ten(11) # False
```



### Python's awesome index/slice operator

## Some questions for later
- Difference between `is` and `==`