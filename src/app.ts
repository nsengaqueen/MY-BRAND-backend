import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import contactRoute from './routes/contactRoutes';
import blogRoutes from './routes/blogRoutes';
import likesRoutes from './routes/likesRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
const app: Application = express();


const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'My Brand',
      version: '1.0.0',
      description: 'My API',
    },
  },
  apis: ['./swagger/*.ts'], 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));












app.use(blogRoutes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/users', userRoutes);
app.use(likesRoutes);
app.use(contactRoute);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
 
  export {app};