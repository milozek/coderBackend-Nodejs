FROM node:lts-iron

# Selecciona un directorio diferente para evitar conflictos con la carpeta /app/node_modules/bcrypt
WORKDIR /usr/src/app

COPY package*.json ./

# Instala las dependencias sin construir bcrypt
RUN npm install

# Construye bcrypt después de instalar las demás dependencias
RUN npm install --build-from-source bcrypt

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
