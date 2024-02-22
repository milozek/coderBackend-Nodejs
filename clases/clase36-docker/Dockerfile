# imagen base
FROM node:lts-iron

# internal folder to save our project
WORKDIR /app

# copy our package.json to folder dockeroperations
COPY package*.json ./

# internal npm i
RUN npm i 
# -build-from-source bcrypt >> solution for bcrypt

# copy the full code from our app
COPY . .

# exponer un puerto
EXPOSE 8080

# run 'npm start' / have it ready in the pkg.json
CMD [ "npm", "start" ]

## when the app is ready, run: 

## 'docker build -t dockeroperations:1.0.0 .' 
## >> (-t = tag, will be our app name)

### this creates our Image. ("class - instance"). 
### now we need to instantiate a container

### 'docker run -p 8080:8080 dockeroperations'