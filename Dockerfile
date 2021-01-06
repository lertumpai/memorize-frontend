FROM node:lts

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

ENV LOCAL_STORAGE_KEY=current_user

ARG SERVER_URL
ENV SERVER_URL=$SERVER_URL

ARG SERVER_UPLOAD_IMAGE_URL
ENV SERVER_UPLOAD_IMAGE_URL=$SERVER_UPLOAD_IMAGE_URL

ARG SERVER_UPLOAD_IMAGE_URL_PROFILE_PATH
ENV SERVER_UPLOAD_IMAGE_URL_PROFILE_PATH=$SERVER_UPLOAD_IMAGE_URL_PROFILE_PATH

ARG SERVER_UPLOAD_IMAGE_URL_ARTICLE_PATH
ENV SERVER_UPLOAD_IMAGE_URL_ARTICLE_PATH=$SERVER_UPLOAD_IMAGE_URL_ARTICLE_PATH

ARG SERVER_URL_PATH
ENV SERVER_URL_PATH=$SERVER_URL_PATH

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
