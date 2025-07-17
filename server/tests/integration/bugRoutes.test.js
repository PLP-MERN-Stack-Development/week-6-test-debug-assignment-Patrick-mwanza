import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../app.js'; // or just '../../app' if not using "type": "module"
import Bug from '../../models/bugModel.js';

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

afterEach(async () => {
  await Bug.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

describe('Bug API', () => {
  it('should create a bug', async () => {
    const res = await request(app)
      .post('/api/bugs')
      .send({ title: 'Test Bug', description: 'Bug description' });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Bug');
  });

  it('should update a bug', async () => {
    const bug = await Bug.create({ title: 'Bug', description: 'Bug desc' });

    const res = await request(app)
      .put(`/api/bugs/${bug._id}`)
      .send({ status: 'in-progress' });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('in-progress');
  });

  it('should delete a bug', async () => {
    const bug = await Bug.create({ title: 'Bug', description: 'Bug desc' });

    const res = await request(app).delete(`/api/bugs/${bug._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
  });
});
