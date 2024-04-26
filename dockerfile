# Use a imagem base com Node.js
FROM node:14

# Instale as dependências do aplicativo
WORKDIR /app
COPY package.json .
RUN npm install

# Copie os arquivos do aplicativo
COPY . .

# Defina o comando de inicialização do aplicativo
CMD ["npm", "start"]

