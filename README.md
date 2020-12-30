# env
```
SERVER_URL=localhost:5000/graphql
LOCAL_STORAGE_KEY=current_user
NODE_ENV=development
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

# run application
docker run --name memorize-frontend -p 3000:3000 lertumpai/memorize-frontend

# Push docker
docker commit memorize-frontend lertumpai/memorize-frontend
docker push lertumpai/memorize-frontend
docker tag memorize lertumpai/memorize-frontend
```
