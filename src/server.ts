import { categoriesRoutes } from '@routes/categories.routes';
import { specificationRoutes } from '@routes/specifications.routes';

import express from 'express'

const app = express();
app.use(express.json());

app.use("/categories",categoriesRoutes);
app.use("/specifications",specificationRoutes);

app.listen(3333,()=>{console.log("ola")})

