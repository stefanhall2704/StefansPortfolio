FROM node:19-buster as build
WORKDIR /code
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm i -g npm@9.1.1 && \
    npm i && \
    find /code/node_modules/ ! -user root | xargs chown root:root

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]