import "reflect-metadata"
import './shared/container'
import express from 'express';
import swaggerUi from 'swagger-ui-express'
import { router } from './routes'
import swaggerFile from './swagger.json'
import { myDataSource } from './database/app-data-source';

myDataSource.initialize().then(() => {
  console.log("Conecctado com sucesso")
}).catch((err) => {
  console.log(`Erro ao conectar ${err}`)
})
const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router)
app.listen(3333, () => { console.log("parei na aula capt3/continuando a app/03-injecao/aula2") })

