# Structure of an App

## Primary app
As mentioned at the end of the last section, the app with the same name as the project is the entry point for your data. It will start off with these files:

```
__init__.py # make a module - ignore this
asgi.py and wsgi.py # related to deployment - ignore for development
urls.py # Where you maintain a list of endpoints and their corresponding handlers
settings.py # Exactly what is sounds like. Where you add middleware, maintain a list of installed apps (including those from other parts of the project), configure databases and suchlike
```

Depending on what your project was for, you might then add other things. If you wanted this app to interact with a database, you could add a models.py (or you could get another app to interact with a database and import their class here). For a GraphQL/Graphene API, it would make sense to add a schema.py, which would interact with a model. 

Generally, it makes sense to separate concerns, and use this app to route tasks to other apps in the project.

## Subsequent apps
Subsequent apps created with 

```
pymp startapp <name> # see commands.md
```

will have more files in them:

```
__init__.py
admin.py # this is where you register models for the admin site, with e.g. admin.site.register(MyModel)
apps.py
models.py
tests.py
views.py
```