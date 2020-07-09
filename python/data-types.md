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
"""
multi
line
string
"""
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

### Dictionaries
- keys should be strings
- square-bracket lookup works but dot access doesn't
- Add new keys with the assignment operator just like JS
- delete a key with the del keyword: `del my_obj['c']`
- Find the number of pairs with len(): `len(my_obj)`
- You can check whether a dictionary has a key with the    `in` keyword: `'a' in my_dict'
  - Naturally this only works for key lookup
- Get a list of keys: `list(my_dict)` or an iterable: `iter(my_dict)`
- Iterate through keys of a dictionary: `for k in my_dict:`