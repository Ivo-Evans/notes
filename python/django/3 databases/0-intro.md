# Databases

Django supports various relational databases. It comes right out of the box with a SQLite database, but this can be upgraded. It uses an ORM layer, so that you never have to write SQL; you just write models which interface with the database. It also doesn't require you to manually create the database, but infers the database from your models. It automatically handles migrations for you with the two commands

```
pymp makemigrations
pymp migrate
```