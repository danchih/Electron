# Define a imagem base
FROM node:latest

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos necessários
COPY server ./server
COPY package.json .
COPY package-lock.json .

# Instala o famework express
RUN npm install -g npm@latest
RUN npm install express --save

# Instala as dependências
RUN npm install

COPY . .

# Expõe a porta 3000
EXPOSE 3000

# Comando de inicialização do servidor
CMD ["node", "server/server.js"]
