FROM node:lts-alpine3.14 as build-stage
WORKDIR /app/frontend

COPY package*.json ./
RUN yarn 

COPY ./ .
RUN yarn build 

FROM nginx:mainline-alpine as frontend-stage
RUN mkdir /app

COPY --from=build-stage /app/frontend/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
