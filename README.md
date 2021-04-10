# env
Create file .env.development
```
NODE_ENV=production
SERVER_URL=http://35.189.33.46
SERVER_URL_PATH=/backend/graphql
LOCAL_STORAGE_KEY=current_user
SERVER_UPLOAD_IMAGE_URL=http://34.126.83.31:4000/upload
SERVER_UPLOAD_IMAGE_URL_PROFILE_PATH=/profile
SERVER_UPLOAD_IMAGE_URL_ARTICLE_PATH=/article
SERVER_URL_IMAGE=http://34.126.83.31:4000
```

# CSS convention
```
* container -> It's handle only space of component (padding/ margin/ width/ height/ display/ label)
* component -> It's handle only itself size (padding/ margin/ width/ height/ effect)
* style -> It's handle only the color.

container-domain-items-memorize
items-domain-memorize
style-items-memorize
* items are set of object. eg. button, textarea, textbox
* domain is optional
```

# Docker
```
# build image
docker build --no-cache -t lertumpai/memorize-frontend .

# build for production
docker build --build-arg .env.production --no-cache -t lertumpai/memorize-frontend .

# run application
docker run --name memorize-frontend -p 3000:3000 lertumpai/memorize-frontend

# Push docker
docker commit memorize-frontend lertumpai/memorize-frontend
docker push lertumpai/memorize-frontend
docker tag memorize lertumpai/memorize-frontend
```
