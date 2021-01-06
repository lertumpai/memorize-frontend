FROM node:lts

ENV NODE_ENV=production
ENV LOCAL_STORAGE_KEY=current_user

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
