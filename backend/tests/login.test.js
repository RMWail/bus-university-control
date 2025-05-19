import request from 'supertest';
import database from '../config/database.js'; 
import app from '../app.js'; 


describe('Login Route Integration Test', () => {


  test(' Login successfully with valid credentials Test', async () => {
    const response = await request(app).post('/logincheck')
      .send({
        Username: 'univBusAdmin',     
        Password: 'UnivBiskraAdmin2025'    
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(response.body.answer).toBe(1);
  });

  test('Incorrect password Test', async () => {
    const response = await request(app).post('/logincheck')
      .send({
        Username: 'univBusAdmin',
        Password: 'wrongpass'
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.answer).toBe(-1);
  });

  test('Unknow sername 404 return Test', async () => {
    const response = await request(app)
      .post('/logincheck')
      .send({
        Username: 'nonexistent',
        Password: 'any'
      });

    expect(response.statusCode).toBe(404);
    expect(response.body.answer).toBe(0);
  });
  
  afterAll((done) => {
    database.end((err) => {
      if (err) {
        console.error('Error closing the DB connection:', err);
      } else {
        console.log('DB connection closed');
      }
      done();
    });
  });
});
