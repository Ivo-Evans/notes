# Files

When you use the open() function to open a file, you create a file object.

## Reading files
It's quite a lot like in Ruby:
```
file = open("helloworld.txt", "r")
print(file.read())
for line in file:
    print(line)
```

## Writing to files
```
my_file = open("helloworld.txt", "w") 
# Unlike in Node, this can create a file. 
# Just like in Ruby, the 'w' mode overwrites, and there are modes like r+
my_file.write("hi there")
my_file.truncate(5) # 5 bytes, no arg means 0
```

## Closing files and garbage collection
In CPython the garbage collector is apparently adequate. Not all implementions, however, are as deterministic here. You can also close files with `my_file.close()`. Another option is to use a with..as statement, which use a context manager to guarantee that the file is closed when it's done:
```
with open("helloworld.txt", w) as my_file:
    print(my_file)
```