# Multi-stage builds

Multi-stage deploys are a new(ish) feature of Docker. They're a great way to deploy an SPA or frontend project when you don't need dedicated backend code. They work by building your app in a heavyweight container that has React, Node etc installed, and then pulling the output from the build folder into a second container which is running a lightweight file server like nginx (engine-x). The heavyweight container is then discarded, and your most up to date frontend code is being efficiently served by nginx.

I'm going to cover two ways to do this. The first way does not require you to configure nginx, because it downloads Docker images that contain default configs. The second is more usual, and is the way both Izaac and Google Cloud Platform taught me - but it's a little (only a little) more work, so we'll do it second.

## Build with Tiangolo

.dockerignore:

```
node_modules
```

node_modules is a minimum for .dockerignore - you could put more stuff in.

Here's your Dockerfile:

```
# Stage 0, "build-stage", based on Node.js, to build and compile the frontend

FROM tiangolo/node-frontend:10 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15
COPY --from=build-stage /app/build/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
```

Notice that this Dockerfile uses RUN where the previous one used CMD. RUN is a command to be run once during build time, which causes changes to the image. CMD is a default command to be run once your _container_ starts. RUN is great for changing the filesystem, and CMD is great for getting stuff up and running. 

Next you build your image, and run it:

```
docker build -t my-react-app:1 .
docker run --name my-app -p 80:80 my-react-app:1
```

To see what these commands mean, read the previous article.

## Build with your own nginx config

You can also write your own nginx config. In that case, you'd add a .dockerignore, Dockerfile, and nginx.conf to the root of your project:

Dockerfile:

```
# build environment
FROM node:12-alpine as react-build
WORKDIR /app
COPY . ./
# pretty sure you could use npm if you wanted to on this image
RUN yarn
RUN yarn build

# server environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/configfile.template
ENV PORT 8080
ENV HOST 0.0.0.0
RUN sh -c "envsubst '\$PORT'  < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf"
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
```

So what's your nginx.conf? Here:

```
server {
     listen       $PORT;
     server_name  localhost;

     location / {
         root   /usr/share/nginx/html;
         index  index.html index.htm;
         try_files $uri /index.html;
     }

     gzip on;
     gzip_vary on;
     gzip_min_length 10240;
     gzip_proxied expired no-cache no-store private auth;
     gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml;
     gzip_disable "MSIE [1-6]\.";

}
```

It gets the port variable from the environment then serves up index.html. It also turns on gzip compression for speed. 