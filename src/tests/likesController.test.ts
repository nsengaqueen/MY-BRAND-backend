import request from 'supertest';
import mongoose, { ConnectOptions } from 'mongoose';
import {app} from '../app'; 
import Blog from '../models/Blog';



describe('Likes Controller', () => {
    beforeAll(async () => {
      await mongoose.connect('mongodb://localhost:27017/tests', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }as ConnectOptions);
    });
  
    afterAll(async () => {
      await mongoose.connection.close();
    });
  
    beforeEach(async () => {
      await Blog.deleteMany({});
    });
    
  
    it('should return 404 if blog is not found', async () => {
      await request(app)
        .post('/blogs/invalid-id/like')
        .expect(404);
    });
  });
