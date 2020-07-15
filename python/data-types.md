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

### Strings
- immutable
- single and double quotes work the same

#### String literal shenanigans
- adjacent strings are automaticall concatenated
```
"this""is""concatenated"
```
- triple-quoted strings create multi-line blocks of text (automatically insert \n). Attempts to define multiline blocks without triple quotes will throw errors.
```
"""
multi
line
string
"""
```
- In Python people often put a letter before the quote marks, which affects the behaviour of the strings
  - r, or raw strings, treat everything as literal text (no escape sequences)
  - f, or format strings, let you interpolate:
```
name = 'World'
program = 'Python'
print(f'Hello {name}! This is {program}')
# Hello World! This is Python
```
- You can also do format strings, like in Ruby
  - '%d %s, %d you' % (1, 'spam', 4.0) # '1 spam, 4 you'
- You can number them too:
  - '{0}/{1}/{2}'.format('usr', 'home', 'bob')

#### String methods
Python seems to have a fair few string methods. 

```
"myString".center(12, '-')
# '--myString--'
# why not eh
```

### Lists

#### How looping and iterating works
When you loop, use a list comprehension (see relevant .md file), or use a function like map, Python creates an iterable object from the list, calls it's `__iter__()` method to create an iterator, and then iterates through the iterator. Each index is an object in the OOP sense with methods.

#### Some common methods

- list.pop(index) # pops AT ANY INDEX. If no argument is provided does the traditional pop
- list.append() # push equivalent
- list.sort(key=None, reverse=False) # key is a function to yield a number
- list.reverse()
- list.insert(element, index) # to insert many elements use `list[i:i] = [1, 2]`
- zip(list, list)

#### What about map, foreach, filter, reduce/inject etc?

Python 3.0 removed reduce() in favour of for-loops (for readability). foreach never existed, but the python for..in loop is equivalent. map and filter exist but they aren't list methods, they're functions that take a list as their second argument.

```
def my_func(n):
    return Ord(n)

ordinals = map(my_func, ['a', 'b', 'c'])
# ordinals is an iterator
list(ordinals)
```

### Tuples
Tuples are like immutable lists. They use a call-by-value-esque strategy - two identical tuples are considered to be the same. 

There aren't many methods defined for them. You can use the sequence operators that you can use for lists, including concatenation, len(), [], and `val in my_tuple === true`.


### Dictionaries
- Any immutable object is a valid key; that is, a string, a number, a boolean or a tuple
  - it seems that tuples don't use the call by reference but call by value strategy - two idential tuples are considered the same
- square-bracket lookup works but dot access doesn't
- Trying to access a nonexistent key with [] throws an error, but not with my_dict.get()
- Add new keys with the assignment operator just like JS
- delete a key with the del keyword: `del my_obj['c']`
- Find the number of pairs with len(): `len(my_obj)`
- You can check whether a dictionary has a key with the    `in` keyword: `'a' in my_dict'
  - Naturally this only works for key lookup
- Get a list of keys: `list(my_dict)` or an iterable: `iter(my_dict)`
- Iterate through keys of a dictionary: `for k in my_dict:`

## How iterating works
- in Python 3, calling an iterating method creates a view object, and the view object 'retains the order in the original dictionary'.

## Some useful methods
- dictionary.update(second_dictionary) # folds second_dictionary into first, similar to spread operator in JS
- dictionary.keys()
- dicitonary.values()
- dictionary.items() # arr of arrs [[k, v], [k, v]]
- dictionary.copy() # returns a shallow copy

## Two keyword patterns

### Loop
```
for wolo in wolokey:
    print(wolokey)
```
### check for key:
```
"four" in wolo
# True
```