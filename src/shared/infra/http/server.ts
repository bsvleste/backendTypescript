import "reflect-metadata";
import '../../container';

import express, { Request, Response, NextFunction } from 'express';
import "express-async-errors"
import swaggerUi from 'swagger-ui-express'
import { router } from './routes'
import swaggerFile from '../../../swagger.json'
import { myDataSource } from '@shared/infra/typeorm/app-data-source';
import { AppError } from "@shared/errors/AppError"

myDataSource.initialize().then(() => {
  console.log("Connect whit success")
}).catch((err) => {
  console.log(`Error ao connecter ${err}`)
})
const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router)
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message
    })
  }
  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${error.message}`
  })
}
)
app.listen(3333, () => { console.log("parei na aula capitulo04 - teste de integração") })

