// tests/tasks.test.js
const request = require('supertest');
const app = require('../src/server');
const db = require('../src/config/db');

describe('Tasks API', () => {
  beforeAll(() => {
    db.run('DELETE FROM tasks');
  });

  afterAll(() => {
    db.close();
  });

  let createdId;

  test('Create task - POST /api/tasks', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test Task', description: 'Task description' })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Test Task');
    createdId = res.body.id;
  });

  test('List tasks - GET /api/tasks', async () => {
    const res = await request(app).get('/api/tasks').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  test('Get task - GET /api/tasks/:id', async () => {
    const res = await request(app).get(`/api/tasks/${createdId}`).expect(200);
    expect(res.body).toHaveProperty('id', createdId);
  });

  test('Update task - PUT /api/tasks/:id', async () => {
    const res = await request(app)
      .put(`/api/tasks/${createdId}`)
      .send({ title: 'Updated Title', completed: true })
      .expect(200);

    expect(res.body).toHaveProperty('title', 'Updated Title');
    expect(res.body).toHaveProperty('completed', true);
  });

  test('Delete task - DELETE /api/tasks/:id', async () => {
    const res = await request(app).delete(`/api/tasks/${createdId}`).expect(200);
    expect(res.body).toHaveProperty('message', 'Task deleted');
  });
});
