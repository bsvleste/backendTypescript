docker build -t rentx .
rodar o docker run -p 3333:3333 rentx, para inicializar o container
docker compose up para criar conteiner com compose

usar npm run migration:create src/database/migrations/"nome da migrations" para crias as migrations
abriar o servido do windows e parar o postgre para funcionar o docker
