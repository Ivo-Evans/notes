# dotenv
dotenv is a package for making environment variables available in your code. 

- First you must create a .env file in the top-level of your project. It should contain key-value pairs, all in caps. 
- Next you should install dotenv and require it in any scripts you want to use environment variables in
- Now call ```dotenv.config()```
- now the variables in the .env are available as properties of ```process.env```, e.g. ```process.env.JWT_SECRET```

