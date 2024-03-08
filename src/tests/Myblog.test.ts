import { test, it, describe, expect, beforeAll, afterAll } from '@jest/globals';
import supertest, { Request, Response } from 'supertest';
import mongoose from 'mongoose';
import {app} from '../app';
import dotenv from 'dotenv';


beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/blogs_db");
}, 50000);

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Testing API', () => {
  it('/api/* for 404', async () => {
    const response = await supertest(app).get('/api/*');
    expect(response.statusCode).toBe(404);
  })
 
    it('get blogs', async () => {
      const response = await supertest(app).get('/blogs');
      expect(response.statusCode).toBe(200);
    })
     
      it('get blog by id for error', async () => {
        const id = '65e18e869d3a80a41aac06d8';
        const response = await supertest(app).get(`/blogs/${id}`);
        expect(response.statusCode).toBe(404);
      })

      it('should return 400 if title, content, or image are missing', async () => {
        const response = await supertest(app)
          .post('/blogs')
          .send({ title: 'Test Title', content: 'Test Content',image:'test image' });
    
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Title, content, and image are required');
      })
      it('should return 400 if no file is uploaded', async () => {
        const response = await supertest(app)
          .post('/blogs')
          .send({ title: 'Test Title', content: 'Test Content', file: undefined });
    
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('No file uploaded');
      })
      it('should return a blog with status 201 when blog is found', async () => {
       
        const newBlog = {
          title: 'Test Blog',
          content: 'This is a test blog',
          images: 'test.jpg',
        };
        
        const id ='65e18e869d3a80a41aac06d8'
      
        const response = await supertest(app).get(`/blogs/${id}`);
    
        expect(response.status).toBe(201);
        expect(response.body.title).toBe('Test Blog');
        expect(response.body.content).toBe('This is a test blog');
       
      });
    
      it('should return status 500 when an error occurs', async () => {
       
        const invalidId = 'invalid-id';
        const response = await supertest(app).get(`/blogs/${invalidId}`);
    
        expect(response.status).toBe(500);
        
      });
      
      });
     
 
      

