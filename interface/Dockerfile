ARG NODE_VERSION=20.17.0

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV production

WORKDIR /usr/src/app

COPY . /interface/

RUN echo "Contents of /interface:" && ls -R /interface