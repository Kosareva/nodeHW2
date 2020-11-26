// const userSeeds = require('../../../db/pg/old/users.seeds');
const userSeeder = require('../../../db/pg/seeders/demo-user');
const request = require('supertest');
const initApp = require('../../app');
let app,
  token;
const { sequelize: db, Sequelize } = require('../../../db/sequelize');
const queryInterface = db.getQueryInterface();

describe('test the user path', () => {
  beforeAll(async () => {
    app = await initApp();
  });

  beforeEach(async () => {
    await userSeeder.up(queryInterface, Sequelize);

    const response = await request(app)
      .post('/auth/login')
      .send({
        username: 'user1',
        password: 'password'
      });
    token = response.body.token;
  });

  afterAll(() => {
    db.close();
  });

  it('should get users', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });

  it('should create user', async () => {
    const response = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        login: 'user3',
        password: 'password',
        age: 18
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
        login: 'user3',
        age: 18
      }
    );
  });
});
