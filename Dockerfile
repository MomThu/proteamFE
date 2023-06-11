FROM node:16-alpine as BUILD_IMAGE

# arguments variables
ARG REACT_APP_API_VERSION=1.0.0
ARG REACT_APP_BASE_URL=http://34.87.50.177:3000
ARG REACT_APP_SOCKET_BASE_URL=http://34.87.50.177:3000

ENV HOST=0.0.0.0
ENV PORT=8000

ENV REACT_APP_API_VERSION=$REACT_APP_API_VERSION
ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL
ENV REACT_APP_SOCKET_BASE_URL=$REACT_APP_SOCKET_BASE_URL

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
EXPOSE 8000 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
