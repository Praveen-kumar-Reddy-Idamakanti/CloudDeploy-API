// tests/setup.js
require('dotenv').config({ path: '.env.test' });

// Setup test environment
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key';
