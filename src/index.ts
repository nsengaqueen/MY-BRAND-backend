import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import {app} from './app';

dotenv.config();

const MONGO_URI = 'mongodb+srv://nsengaqueen:Nqueen@072@cluster0.utneeil.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(process.env.DATABASE_URL || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
  }as ConnectOptions)
  .then(() => console.log('MongoDB connected yes'))
  .catch((err) => console.error(err));

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the backend of my portfolio project!');
});


const PORT: number = parseInt(process.env.PORT || '5000');


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
   
 

     


});
