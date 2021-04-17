# env
Create a file .env.development
```
NODE_ENV=development
SERVER_URL=http://localhost:5000
SERVER_URL_UPLOAD=http://localhost:4000
SERVER_URL_PATH=/graphql
LOCAL_STORAGE_KEY=current_user
SERVER_UPLOAD_IMAGE_PATH=/upload
SERVER_UPLOAD_IMAGE_PATH_PROFILE=profiles
SERVER_UPLOAD_IMAGE_PATH_ARTICLE=articles
```

# CI variable
```
DEPLOYMENT_NAME
DOCKER_HUB_REGISTRY_PASSWORD
DOCKER_HUB_REGISTRY_USER
GCP_CLUSTER_NAME
GCP_CLUSTER_ZONE
GCP_PROJECT_ID
GCP_SA_KEY
IMAGE_NAME
=== Docker ENV ===
LOCAL_STORAGE_KEY
NODE_ENV
SERVER_UPLOAD_IMAGE_PATH
SERVER_UPLOAD_IMAGE_PATH_ARTICLE
SERVER_UPLOAD_IMAGE_PATH_PROFILE
SERVER_URL
SERVER_URL_STAGING
SERVER_URL_UPLOAD
SERVER_URL_UPLOAD_STAGING
SERVER_URL_PATH
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
