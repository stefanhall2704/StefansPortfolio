FROM node:19-buster as build
WORKDIR /code
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm i -g npm@8.19.4
RUN npm i
#find /app/node_modules/ ! -user root | xargs chown root:root

COPY . .

# EXPOSE 3000

RUN npm run build
# CMD [ "npm", "run", "start"]

FROM nginx:1.23.3-alpine as prod
COPY --from=build /code/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]