import { test, it, describe, expect, beforeAll, afterAll } from '@jest/globals';
import supertest, { Request, Response } from 'supertest';
import mongoose from 'mongoose';
import {app} from '../app';
import dotenv from 'dotenv';
import ContactModel from '../models/contactModel';

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
  it('get all messages', async () => {
    const response = await supertest(app).get('/message');
    expect(response.statusCode).toBe(200);
  })
  it("should  add a message ", async () => {
    const newMessage = {
      name: "queen",
      email: "nsengaqueen@example.com",
      message: "Test message content"
    };

    const response = await supertest(app).post("/message").send(newMessage);

    expect(response.statusCode).toEqual(201);
  })
  it('should handle error when submitting a message', async () => {
    const invalidMessage = { 
      
    };

    const response = await supertest(app)
      .post('/message')
      .send(invalidMessage);

    expect(response.status).toBe(500);
    expect(response.text).toContain('Internal Server Error');
  });

  it('should delete a message by id', async () => {
    // Create a test message
    const newMessage = new ContactModel({
      name: 'Test User',
      email: 'test@example.com',
      message: 'Test message',
    });
    await newMessage.save();

    const messageId = newMessage._id;

    // Delete the test message
    const response = await supertest(app).delete(`/message/${messageId}`);
    expect(response.status).toBe(204);

    // Verify that the message has been deleted from the database
    const deletedMessage = await ContactModel.findById(messageId);
    expect(deletedMessage).toBeNull();
  });

  it('should return 400 if message id not found', async () => {
    const invalidId = 'invalid-id';

    const response = await supertest(app).delete(`/message/${invalidId}`);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Id not found');
  });
  it('should find a message by id', async () => {
    // Create a test message
    const newMessage = new ContactModel({
      name: 'Test User',
      email: 'test@example.com',
      message: 'Test message',
    });
    const savedMessage = await newMessage.save();
    const id = '65e85d07ebac74f160ab59b1';
    // Find the test message by id
    const response = await supertest(app).get(`/message/:id}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Test User');
  });

  it('should return 400 if message is not found', async () => {
    // Generate a random ObjectId that does not exist
    const randomObjectId = new mongoose.Types.ObjectId();

    // Attempt to find a message using the non-existing ObjectId
    const response = await supertest(app).get(`/message/:id`);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('message not found');
  });

});