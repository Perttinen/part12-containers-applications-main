FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install

EXPOSE 3001

USER node

CMD ["npm", "run", "dev"]