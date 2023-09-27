FROM node:16
  
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci 

ENV DEBUG=todo-backend:*

EXPOSE 3001
  
USER node

CMD ["npm", "start"]