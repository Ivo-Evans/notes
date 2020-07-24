If you don't already have a virtual environment install one and start it up:

```
py3 -m venv venv # py3 is aliased on my machine to python3
py-env venv # py-env is a function i defined for running source venv/bin/activate
```

Then you need to install django in your virtual environment:

```
pip install django
```

Then you need to create a project:

```
django-admin starproject <name>
```

This will create a project folder inside the current working directory, for instance adjacent to the venv file. 

A django _project_ is composed of multiple _apps_. An app is a modular piece of functionality, like the users system for Amazon. The project folder you just created will contain a manage.py and an app called the same thing as the project. Each of these will be an entry point to your project. manage.py makes django commands available as CLI argument variables. And the app with the same name as the project is the entry point for your custom logic. Let's look at some of the commands you can give to manage.py:

```
pymp makemigrations # I aliased pymp to python manage.py
pymp migrate
pymp runserver
pymp startapp <name> # You can give this arguments to avoid the default app template
pymp shell # enter a Python REPL with all of the values from your project available for import
pymp createsuperuser
```