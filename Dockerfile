FROM node:lts

ARG NODE_ENV="production"
ENV NODE_ENV=$NODE_ENV
RUN echo $NODE_ENV

ARG SERVER_URL="http://203.154.83.249:5000/graphql"
ENV SERVER_URL=$SERVER_URL
RUN echo $SERVER_URL

ARG LOCAL_STORAGE_KEY="current_user"
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
