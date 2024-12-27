# This file is a template, and might need editing before it works on your project.
FROM node:20 as build

WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY . ./

RUN ls -l && npm run build && ls -lR build/


FROM nginx:1.17

COPY --from=build build/* /var/lib/www/
