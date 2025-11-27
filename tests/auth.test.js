// tests/auth.test.js
const User = require('../src/models/User');
const db = require('../src/config/db');

describe('Authentication Tests', () => {
  
  beforeAll(() => {
    // Setup test database
    db.run('DELETE FROM users');
  });

  afterAll(() => {
    db.close();
  });

  describe('User Registration', () => {
    test('should register a new user', async () => {
      const user = await User.create('Test User', 'test@example.com', 'password123');
      expect(user).toHaveProperty('id');
      expect(user.name).toBe('Test User');
      expect(user.email).toBe('test@example.com');
    });

    test('should hash the password', async () => {
      const user = await User.create('Another User', 'another@example.com', 'password123');
      const dbUser = await User.findByEmail('another@example.com');
      expect(dbUser.password).not.toBe('password123');
    });

    test('should prevent duplicate emails', async () => {
      await User.create('User 1', 'duplicate@example.com', 'password123');
      
      try {
        await User.create('User 2', 'duplicate@example.com', 'password123');
        fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).toContain('UNIQUE constraint failed');
      }
    });
  });

  describe('User Login', () => {
    beforeEach(async () => {
      db.run('DELETE FROM users');
      await User.create('Login User', 'login@example.com', 'correctpassword');
    });

    test('should match correct password', async () => {
      const user = await User.findByEmail('login@example.com');
      const isMatch = await User.matchPassword('correctpassword', user.password);
      expect(isMatch).toBe(true);
    });

    test('should not match incorrect password', async () => {
      const user = await User.findByEmail('login@example.com');
      const isMatch = await User.matchPassword('wrongpassword', user.password);
      expect(isMatch).toBe(false);
    });
  });

  describe('User Retrieval', () => {
    beforeEach(async () => {
      db.run('DELETE FROM users');
      await User.create('Retrieve User', 'retrieve@example.com', 'password123');
    });

    test('should find user by email', async () => {
      const user = await User.findByEmail('retrieve@example.com');
      expect(user).toBeDefined();
      expect(user.email).toBe('retrieve@example.com');
    });

    test('should return null for non-existent email', async () => {
      const user = await User.findByEmail('nonexistent@example.com');
      expect(user).toBeUndefined();
    });

    test('should find user by id', async () => {
      const createdUser = await User.create('ID User', 'iduser@example.com', 'password123');
      const foundUser = await User.findById(createdUser.id);
      expect(foundUser).toBeDefined();
      expect(foundUser.email).toBe('iduser@example.com');
    });
  });
});
