# Making an Express server run out of a docker container

To do this, you'll need the Docker CLI installed and a node project that listens on a port defined in an environment variable called PORT.

## Add a Dockerfile and .dockerignore to your project

We're going to add two files to the root of our projects. The first is a `Dockerfile`. Here's what it will contain:

```
# Get the node:12.16.3 docker image from dockerhub.com
FROM node:12.16.3
# create the /code directory
WORKDIR /code
# define an environmental variable PORT=1000
ENV PORT=1000
# copy package.json from our project to the docker image
COPY package.json /code/package.json
# copy package-lock.json from our project to the docker image
COPY package-lock.json /code/package-lock.json
# run npm install in the docker image, adding our node modules to the docker image
RUN npm install
# copy everything else from our project into the docker image, not including the files in the docker ignore
COPY . /code
# run node server.js
CMD ["node", "server.js"]


## Why the order: docker caches commands sequentially, so you should put things you plan to change less often (like node modules) earlier

```

Your .dockerignore will contain

```
.git
node_modules
```

## Setting up and running a docker container locally

### Step 1: make a Docker

The files above haven't done anything yet. In fact, they won't do anything, until we create an _image_ from our files. To do so, let's run:

```
docker build --tag name:tag .
```

Ok, let's break down the anatomy of that command. 

- `docker` invokes the docker command. 
- `build` specifies that the command should build an image.
- `--tag` specifies that we should name, and optionally tag, our image. In our example, we made the name `name` and the tag `tag`, but in a real project we wouldn't do it like that. We might have something more like `myImage:0.0.1`. The tag is most useful for versioning, and it is optional (even with the `--tag`) command. 
- Finally, the `.` tells the docker build command to look in the current directory for a Dockerfile, which is exactly what it finds when it makes the image.

#### Sidenote: what is a Docker image?

A Docker image isn't a container, nor is it the end result of your work with Docker. An image is like a statis snapshot of a container, or, in programming terms, a class. A container, then, is an image given life, like an instance of a class. 

#### Sidenote: check your images
You can see what images you have with `docker image ls` or, if you want to see even more, `docker image ls -a`. You'll notice that Docker images, like containers, can quickly clutter up your computer. [Here's](https://www.digitalocean.com/community/tutorials/how-to-remove-docker-images-containers-and-volumes) an article on how to delete them.

### Step 2: Make a container from the image
Ok, now we're going to use another command to make a running docker container from an image:

```
docker run --name container-name -d -p 8080:1000 name:tag
```

So let's break down this command.

- `docker run` tells docker to run a new container, or run a command in a new container. 
- `--name` indicates the name of the container, which could have been anything. 
- The `-d` flag stands for _detach_, and it just means that the docker container won't block your terminal while it's running, but run in the background. 
- The `-p` flag stands for port, and takes an argument, in this case `8080:1000`. A docker container's network is isolated from the network of your operating system, to ensure that projects are kept safe and isolated. If you want a docker container to talk to the operating system it exists in over the network, you map a port on your local machine (in our case 8080) to a port inside the docker container (1000). Now, calls to 8080 on our computer will call 1000 in the docker image, and the same holds the other way. 
- The final part of the command is `name:tag`. This just tells us which image to run the container from.

If you go to localhost:8080 now you should see whatever your express app serves at its home route. But don't go just yet! There's some things you should know.

#### Commands for containers

##### List containers
`docker container ls` lists all _active_ containers.
`docker container ls -a` lists all containers on your system.

##### Stop a running container
`docker stop -t 0 container-name`

##### Delete a container
You cannot delete a running container. To delete a stopped container, run
`docker rm container-name`
