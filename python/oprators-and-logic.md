
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
- square bracket syntax as normal

#### Fundamentals
- negative indexing possible
- out of bounds throws IndexError

#### Ranges
- Slice a nonunclusive range with a colon: `'abcdef'[2:4] # 'cd'`
- Slice from beginning or end by omitting one term:  `'abcdef'[:4] # 'abcd'`, `'abcdef'[2:] # 'cdef'`
- You can combine range slicing with negative indexing: `'abcdef'[1:-1] # 'bcde'`, `'abcdef'[4:-4] # ''`, `'abcdef'[-4:4] # 'cd'`
- You can combine start and end defaults to make a shallow copy with `[:]`

#### Range slicing with a stride
- You can add a _third_ term, which is the stride:
```
'abcdefghijk'[1:-1:2] # 'bdfhj'
# Here a stride of two cuts out every second element
'abcdef'[::2] # every second item
```
- The stride defaults to 1
- You can also set a minus stride:

```
'abcde'[::-1] # 'edcba' # reverse the input
'abcdefghijklmnopqrstuvwxyz'[:1:-3] # 'zwtqnkhe' # gnarly
```

#### Assigning to a range slce
- you can do it
```
numbers = [1, 2, 3, 4, 5]
numbers[:2] = ['1', '2']
print(numbers) # ['1', '2', 3, 4, 5]
```
- As well as replacing, you can insert:
```
numbers = [3, 4, 5]
numbers[:0] = [1, 2]
print(numbers) 
# [1, 2, 3, 4, 5]
numbers[len(numbers):] = [6, 7]
print(numbers) 
# [1, 2, 3, 4, 5, 6, 7]
numbers[3:3] = [4.2, 4.4, 4.6, 4.8] # note 3:3 - 3:4 would insert before index 3 for some reason
print(numbers) 
# [1, 2, 3, 4.2, 4.4, 4.6, 4.8, 4, 5, 6, 7]

```
- for stepped ranges insertion is limited to replacement - you need to insert the same number you take out: 
```
zeros = [0, 0, 0, 0, 0, 0]
zeros[::2] = [1, 1, 1]
print(zeros) # [1, 0, 1, 0, 1, 0]
zeros[::2] = [1, 1, 1, 1] # ValueError
```

##### Make a shallow copy

`[:]` makes a top-level, shallow copy.