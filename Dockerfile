FROM node:16-alpine as BUILD_IMAGE

# arguments variables

# parse args to env here


WORKDIR /app

COPY package*.json yarn.lock ./


# Install the dependencies
RUN yarn install 

COPY . .

# Build the project and copy the files
RUN yarn build


FROM nginx:alpine

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

# Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

COPY --from=BUILD_IMAGE /app/build /usr/share/nginx/html

# switch to public 80 on vps server

ENTRYPOINT ["nginx", "-g", "daemon off;"]