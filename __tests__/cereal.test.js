const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');

const request = require('supertest');
const app = require('../lib/app');
const Cereal = require('../lib/models/Cereal');


describe('backend42 routes', () => {
  beforeAll(async() => {
    const uri = await mongod.getUri();
    return connect(uri);
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(async() => {
    await mongoose.connection.close();
    return mongod.stop();
  });

  it('Will crate a new Cereal', () => {
    return request(app)
      .post('/api/v1/cereal')
      .send({
        name: 'langson',
        thoughts: 'should be a top 5 brand what dose the rabit got on him',
        scale: '10',
        tags: ['cereal', 'good']
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          name: 'langson',
          thoughts: 'should be a top 5 brand what dose the rabit got on him',
          scale: 10,
          tags: ['cereal', 'good'],
          __v: 0
        });
      });
  });

  it('Will crate a new Cereal', async() => {
    await Cereal.create({
      name: 'langson',
      thoughts: 'should be a top 5 brand what dose the rabit got on him',
      scale: '10',
      tags: ['cereal', 'good']
    });

    return request(app)
      .get('/api/v1/cereal')
      .then(res => {
        expect(res.body).toEqual([{
          _id: expect.anything(),
          name: 'langson',
          thoughts: 'should be a top 5 brand what dose the rabit got on him',
          scale: 10,
          tags: ['cereal', 'good'],
          __v: 0
        }]);
      });
  });
});
