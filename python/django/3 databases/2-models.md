# Models and Django's ORM

Django's ORM uses model classes. Each _table_ in the database is represented by a model. Any changes to the model need a new migration.

## Defining a model

Let's look at an example file:

```
from django.db import models
from django.conf import settings

class Link(models.Model):
    url = models.URLField()
    description = models.TextField(blank=True)
    posted_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.CASCADE)

```

There's a few things to take from this:
- the class inherits from the django `Model` class
- it's individual fields are the return values of parameterized methods in the django `model` module

## What does the nested class Meta do?

sometimes a model class will have a class inside it called `Meta`. This defines information which is not a column, such as the ordering:

```
from django.db import models

class Snippet(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='')
    code = models.TextField()
    linenos = models.BooleanField(default=False)
    language = models.CharField(choices=LANGUAGE_CHOICES, default='python', max_length=100)
    style = models.CharField(choices=STYLE_CHOICES, default='friendly', max_length=100)

    class Meta:
        ordering = ['created']
```

## How to use a model class in code
Instances of a model class have certain useful methods defined on them. Say we have a model called Snippet, we can use:

```
Snippet.objects.all()
Snippet.objects.all[0].delete()
Snippet.objects.filter(title="hi").first()
Snippet.objects.create(created="x", title="y")
```