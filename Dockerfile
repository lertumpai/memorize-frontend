FROM node:lts

ENV NODE_ENV=$NODE_ENV
RUN echo $NODE_ENV

ENV SERVER_URL=$SERVER_URL
RUN echo $SERVER_URL

ENV SERVER_URL_PATH=$SERVER_URL_PATH
RUN echo $SERVER_URL_PATH

ENV LOCAL_STORAGE_KEY=$LOCAL_STORAGE_KEY
RUN echo $LOCAL_STORAGE_KEY

# set a directory for the app
WORKDIR /usr/src/memorize-frontend

# copy all the files to the container
COPY package.json /usr/src/memorize-frontend

RUN npm install

COPY . /usr/src/memorize-frontend

RUN npm run build

# tell the port number the container should expose
EXPOSE 3000

# run the command
CMD ["npm", "run", "start"]
