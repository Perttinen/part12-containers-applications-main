FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

# COPY . .

RUN npm install

ENV DEBUG=phonebook-backend:*

USER node

CMD ["npm", "run", "dev"]