# Define a imagem base usando a versão oficial do Node.js 20 (Alpine para uma imagem mais leve)
FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os arquivos de dependências primeiro (para aproveitar o cache do Docker)
COPY package.json package-lock.json ./

# Instala todas as dependências necessárias
RUN npm install --production

# Copia os arquivos restantes do projeto para o container
COPY . .

# Expõe a porta que a aplicação usa
EXPOSE 3000

# Compila o aplicativo usando o Nest CLI
RUN npm run build

# Define o comando para iniciar a aplicação
CMD ["node", "dist/main"]
