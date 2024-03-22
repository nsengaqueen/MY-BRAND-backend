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
import { CorsOptions } from 'cors';
const app: Application = express();
app.use(cors({
    credentials:true,
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     
  extended: true
}))

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*"); 
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );
//     if (req.method === "OPTIONS") {
//         res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//         return res.status(200).json({});
//     }
//     next();
// });

const allowedOrigins = ['http://localhost:5500', 'http://127.0.0.1:5500', 'https://my-brand-backend-1-g6ra.onrender.com'];
const corsOptions:  CorsOptions = {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  };
  
  app.use(cors(corsOptions));

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