# Introdução

Aplicação Node.Js baseada nos vídeos da empresa Rocketseat
- https://www.youtube.com/channel/UCSfwM5u0Kce6Cce8_S72olg

# Pacotes Instalados
## dependencias
yarn add bcryptjs
yarn add cross-env
yarn add dotenv
yarn add express
yarn add factory-girl
yarn add jsonwebtoken
yarn add pg
yarn add sequelize
yarn add sequelize-cli
yarn add util

## dependencias de desenvolvimento
yarn add faker -D
yarn add jest -D
yarn add nodemon -D
yarn add sqlite -D
yarn add supertest -D

# Comandos Importantes na Shell
# yarn
yarn sequelize db:create
yarn sequelize db:migrate
yarn sequelize model:create --name Student --attributes classroom_id:integer,student_name:string

yarn sequelize db:seed:all

# Docker
docker build -t backend_node/dockernode .
docker run -p 5000:5000 -d backend_node/dockernode
docker-compose up