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
import cors from 'cors'
const app: Application = express();

app.use(cors({
    credentials:true,
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}))

app.use(bodyParser.json());



const options = {
  swaggerDefinition: {
      openapi: '3.0.0',
      info: {
          title: 'My APIs documentation',
          version: '1.0.0',
          description: 'This is my API documentation'
      },
      components: {
          securitySchemes: {
              bearerAuth: {
                  type: 'apiKey',
                  scheme: 'bearer',
                  name: 'Authorization',
                  in: 'header',
                  bearerFormat: 'JWT',
              }
          }
      },
      security: [{
          bearerAuth: []
      }],
      servers: [{
          url: 'http://localhost:5000'
      }]
    
  },
  apis: ['./src/swagger/*.ts'],
}
const specs = swaggerJSDoc(options)


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));






app.use(cors({
    credentials:true,
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}))

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