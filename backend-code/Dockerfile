# 1. Use uma imagem base do Node.js
FROM node:18-alpine

# 2. Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# 3. Copie o package.json e o package-lock.json para o contêiner
COPY package*.json ./

# 4. Instale as dependências do projeto
RUN npm install --production

# 5. Copie o restante do código da aplicação para o contêiner
COPY . .

# 6. Exponha a porta em que a aplicação estará escutando
EXPOSE 3000

# 7. Defina as variáveis de ambiente que podem ser sobrescritas no runtime
ENV DB_HOST=localhost \
    DB_PORT=5432 \
    DB_NAME=todo_list_db \
    DB_USER=meu_usuario \
    DB_PASSWORD=minha_senha

# 8. Defina o comando para iniciar o servidor Express
CMD ["node", "index.js"]
