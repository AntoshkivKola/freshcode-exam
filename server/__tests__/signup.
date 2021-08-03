const request = require('supertest');
const yup = require('yup');
const db = require('../src/server/models');
const app = require('../src/app')();

const appRequest = request(app);

const { ROLES } = require('../src/constants');

const signUpResponseSuccess = yup.object({
  tokenPair: {
    access: yup.string().required(),
    refresh: yup.string().required(),
  },
  user: {
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    displayName: yup.string().required(),
    email: yup.string().email().required(),
    avatar: yup.string().nullable().required(),
    role: yup.string().oneOf(Object.values(ROLES)).required(),
    balance: yup.number().required(),
    rating: yup.number().required(),
  },
});

const getUserData = () => ({
  firstName: 'Test1',
  lastName: 'Test2',
  displayName: 'testovich',
  password: 'Test1234',
  email: `test${Date.now()}@gmail.com`,
  role: ROLES.CUSTOMER,
});

const user = getUserData();

beforeAll(() => {
  return db.sequelize.sync({ force: true });
});

afterAll(() => {
  return db.sequelize.close();
});

describe('sign up tests', () => {
  test('user should be able to sign up successfully', async done => {
    const response = await appRequest.post('/api/auth/sign-up').send(user);
    expect(response.statusCode).toBe(201);
    expect(signUpResponseSuccess.isValidSync(response.data)).toBe(true);
    done();
  });

  test('user sign up with empty body to expect 400', async done => {
    const response = await appRequest.post('/api/auth/sign-up').send({});
    expect(response.statusCode).toBe(400);
    done();
  });

  test('user with the same email should not be able to sign up expect 409', async done => {
    const response = await appRequest.post('/api/auth/sign-up').send(user);
    expect(response.statusCode).toBe(409);
    done();
  });
});
