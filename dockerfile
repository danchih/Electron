# Dockerfile

# Imagem base
#FROM node:latest

# Instalar dependências do Electron
#RUN apt-get update && apt-get install -y \
  #libgtk2.0-0 \
  #libgtk-3-0 \
  #libnotify-dev \
  #libgconf-2-4 \
  #libnss3 \
  #libxss1 \
  #libasound2 \
  #libxtst6 \
  #xauth \
  #xvfb \
  #curl \
  #&& rm -rf /var/lib/apt/lists/*

# Use uma imagem base do Node.js
FROM node:14

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos da aplicação para o diretório de trabalho
COPY . .

# Exponha a porta onde sua aplicação estará em execução
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "main.js"]
