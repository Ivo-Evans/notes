# Heroku

Heroku is a service for deploying a server. Once you've deployed your app, you can access it at a URL provided by Heroku, or add your own. When I first started using Heroku, I found server deployment intimidating, so I'm writing the guide I wish I'd had. This is a short, practical guide which should take you from zero knowledge to a high level of competency.

## Two ways to access Heroku.
Heroku has a graphical user interface available as its website, and a command line interface available as a downloadable program. To be an effective user of Heroku, you should use __both__, so if you haven't already, go install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli). 


## Deployment with GitHub
The most common way to deploy to Heroku is via GitHub. At the top right of heroku.dashboard.com, hit new and then new app. This doesn't mean you'll be creating original content, but that the app is new for Heroku. Give it a name - the name is up to you - and then select either Europe or America for the location of the server (closer to your users is better). 

Once you've created a Heroku app, you should deploy some code to it. One way to do so is to press the GitHub button, and then select the repo you want to deploy to underneath the GitHub button. Finally, press enable automatic deploys. This means that any changes to the master branch of your GitHub repo will be sent to Heroku and be deployed automatically. 

## How does Heroku know what to do with the files in your GitHub repo?
Once Heroku receives your files, it runs them inside a simulated computer which Heroku people call 'dynos'. To run them, it executes shell commands, just like the ones you use to run code locally. 

But how does it know which shell commands to run? Good question. Heroku looks for the presence of certain files in your project directory. 

If you have a nodeJS project, Heroku will read your package.json, and try to run ```npm start```. ```npm start``` runs the file at the "main" field of your package.json, so you should put the start script of your server there.

Heroku also has its own file format for this, the [Procfile](https://devcenter.heroku.com/articles/procfile). If both a Procfile and a package.json are present, the Procfile takes precedence. A Procfile also allows you to do more complex things with the build.

### Deployment with git
The easiest and, in many cases the best, way to deploy to Heroku is via GitHub. You can also deploy using the Heroku cli and _git_. The effect of this is to deploy from your local machine, instead of from the GitHub servers. 

In your development terminal, assuming that you are in a project ```myproject``` which is a git repository and that you have created an app on Heroku called ```myapp```, the commands to deploy to Heroku with git would be:

```
heroku login
heroku git:remote -a myapp
git push heroku master
```

- The first command logs your local version of the Heroku CLI in, just like you'd need to log your browser in if you went to a website. 
- The second command connects your app myapp to a Heroku remote. This only needs to be done once. 
- The third command pushes the current branch (whatever it may be) to the _master_ branch of your Heroku repository.

This third command was a bit of an 'ah-ha!' moment for me: I realised that while the git push command takes two arguments (e.g. origin master), both of them are about where you push, and presume that you push the current branch.

## Debugging your app with the logs on the website
If your code doesn't run properly, you can look at the logs on the Heroku website. Any console.logs from your application will be displayed here, and Heroku will dump stuff of their own there too. It's a useful place to see logs if you aren't used to the CLI, but I would advise you to leave Heroku's weird light theme and come back to the dark side by debugging your app in the Heroku CLI. 

## Debugging your app in the Heroku CLI
You can use your Heroku CLI to access the same logs we saw above. I find this preferable for a few reasons. One is that it provides the same interface (your terminal) that you used to write your program. Another is that, if you need to do some other stuff, like check out the database, you can do so here too.

So let's learns some Heroku CLI syntax. Heroku has a number of base commands, that you can see by running

```
heroku -h
```

Most of these commands require you to specify an app. Try `heroku logs`: it will tell you you are missing the `-a` flag to indicate the app you want the logs for. To see the apps available in your account, run `heroku apps`. You can use these app names to run CLI commands. If you have an app myapp, you can see its logs with ```heroku logs -a myapp```. If you want the logs to be live updating, you can add in the -t flag: ```heroku logs -t -a myapp```. To exit the logs, press ^C (that's ctrl-C or cmmd-C)

## Environment variables and config vars
Environment variables are values which are used in your program, but are not hardcoded into them. One example is 'secrets' for verifying login tokens: to prevent token forgery, the secret must be, well, secret. Therefore, if the source code is going to be shared, the secret should not be included in that source code. 

In local JavaScript projects, environment variables are often stored in .env files. However, since these files are not checked in to source control (GitHub), they aren't automatically included in your deployed app. 

In Heroku, environment variables are called 'config vars', and you can define them manually on the Heroku site, in the settings tab of your app. 

You can also do this in the command line.

```
heroku config -a myapp
```

gets all the config vars for myapp. And you can set one like this:

```
heroku config:set SOMETHING=something-else -a myapp
```


## Sleepy dynos
Now it's time for some theory. When Heroku runs your code, it runs it in 'dynos', which are simulated operating systems. 'Dyno' is short for _dynamic_, because these dynos are always on the move: they 'cycle' every twelve hours or so.

This means two things for you. Firstly, it means that your code is reset periodically. If you have a variable in your code that increments by 1 every day, it will never get very high, because it will be consistently reset as Heroku moves your code around to allocate data more efficiently. For this reason, if you want any data to persist, you must use a __database__. 

The other implication of Heroku's dyno model is that, if you are on the free plan, Heroku _sleeps_ your dynos if you don't use them for a few hours. This is why, on first load after a slumber, your free application is a little sluggish.

## Adding a database to Heroku
In general, when using databases, you access them with URLs that you find in your program. Often, these URLs are stored as environment variables, and some databases or database management packages, like the pg package for NodeJS, abstract this away from you so that you do not need to enter the URL. 

With Heroku, you can include your own database, hosted wherever you like, but you can _also_ use Heroku as your database provider, by 'provisioning' an addon, which is generally easier. 

The best-supported of the database addons is Heroku-postgresql, so it's what I'll use as my example (I'm also a big fan of relational databases). Let's run through a few commands for provisioning a Heroku PostgreSQL database. 

First we should check whether Heroku has automatically detected that you need a database, and provisioned one for you:

```
heroku addons -a myApp
```

If you do not see a database there, you should provision one:

```
heroku addons:create heroku-postgresql:hobby-dev -a myApp
```

'hobby-dev' is the free tier :)

When you provision a database in Heroku, a DATABASE_URL config var is automatically added to your project, meaning that, in many cases, it should work right out of the box. 

Now that you have a database, you can do some cool stuff with it. One thing you can do is use the `psql` command to explore your remote database and look at data:

```
heroku pg:psql -a myApp
```

If you do this, you might notice that your database is completely empty. One way to put content in it is to push the contents of a local database up. If you have a local database called my_local_db, and an app called myApp, you could run this command, after having pressed ^D to exit psql:

```
heroku pg:push my_local_db DATABASE_URL -a myApp
```

## Teams

When working with Heroku, it's often useful to give team-members access to the project, so that they can do things like look at the logs and database using the CLI, and check the deployment status using the website.

To do this, go to the website, then select your project and use the tab called 'access'. 

That's it. I hope you enjoyed this and that it was useful!