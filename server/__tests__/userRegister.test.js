import request from 'supertest';
import 'babel-polyfill';
import app from '../server';
import db from '../config/inMemoryDB';

const req = request(app);

jest.setTimeout(30000);

describe('POST /user/register', () => {
  beforeAll(async () => {
    await db.createConnection();
  });

  afterAll(async () => {
    await db.closeConnection();
  });

  const data = {
    name: 'Aditya Vyas',
    email: 'vyasaditya41@live.com',
    password: 'abcd1234',
  };

  test('respond with status to be success', async () => {
    await req
      .post('/user/register')
      .send({
        name: 'Yash Pandit',
        email: 'yash@pesto.tech',
        password: 'abcd1234',
      })
      .set('Accept', 'application/json')
      .expect((res) => {
        expect(typeof res.body).toBe('object');
      });
  });

  test('should respond with success for new email address', async () => {
    await req
      .post('/user/register')
      .send(data)
      .set('Accept', 'application/json')
      .expect((res) => {
        expect(res.body.error).toBe(false);
      });
  });

  test('respond with User is already registered', async () => {
    await req
      .post('/user/register')
      .send({
        name: 'Aditya Vyas',
        email: 'vyasaditya41@live.com',
        password: 'abcd1234',
      })
      .set('Accept', 'application/json')
      .expect((res) => {
        expect(res.body.message).toBe('User is already registered');
      });
  });
});
