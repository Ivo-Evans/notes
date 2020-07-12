# Comprehensione expressions and generators

## Lists

### List comprehensions

You can inline for-loops to make lists in Python

```
[letter.capitalize() for letter in 'ivo']
# ["I", "V", "O"]
```

This is called a list comprehension.

You can also _nest_ list comprehensions:

```
res = [x + y for x in range(3) for y in [10, 20, 30]]
print(res) 
# [10, 20, 30, 11, 21, 31, 12, 22, 32]

res = []
for x in range(3):
    for y in [10, 20, 30]:
        res.append(x + y)

print(res) 
# [10, 20, 30, 11, 21, 31, 12, 22, 32]
```


Judging on the section in the book,
1. For simple use cases it's better to use map/filter/etc. instead
2. When you would need to provide map/filter a sophisticated callback, in the form of a lambda, a list comprehension can simplify your life. 

### List-like generators

List comprehensions are clearly really cool. But there's an even cooler, lower level thing, called a generator. It works like a list comprehension, but doesn't manifest an actual list, thus saving memory. The only syntactic difference is the use of round brackets over square ones:

```
me = (letter.capitalize() for letter in "ivo")
print(me) # <generator object <genexpr> at memory-address>
print(list(me)) # ['I', 'V', 'O']
```

One other thing to note is that if you're using a generator as a function, you don't need to include both sets of parentheses:

```
sum(ord(x) for x in 'ivo')
```
