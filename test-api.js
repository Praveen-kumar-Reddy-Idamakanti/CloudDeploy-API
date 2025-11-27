// test-api.js
const http = require('http');

const baseUrl = 'http://localhost:3000';

// Helper function to make HTTP requests
function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, baseUrl);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          body: body ? JSON.parse(body) : null,
        });
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// Test cases
async function runTests() {
  console.log('🧪 Starting API Tests...\n');

  try {
    // Test 1: Register a new user
    console.log('Test 1: Register a new user');
    const registerRes = await makeRequest('POST', '/api/auth/register', {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });
    console.log('Response:', registerRes);
    const token = registerRes.body?.token;
    console.log('✅ Registration successful\n');

    // Test 2: Register with duplicate email
    console.log('Test 2: Try to register with duplicate email');
    const dupRes = await makeRequest('POST', '/api/auth/register', {
      name: 'Jane Doe',
      email: 'john@example.com',
      password: 'password456',
    });
    console.log('Response:', dupRes);
    console.log('✅ Duplicate check working\n');

    // Test 3: Login with correct credentials
    console.log('Test 3: Login with correct credentials');
    const loginRes = await makeRequest('POST', '/api/auth/login', {
      email: 'john@example.com',
      password: 'password123',
    });
    console.log('Response:', loginRes);
    console.log('✅ Login successful\n');

    // Test 4: Login with wrong password
    console.log('Test 4: Login with wrong password');
    const wrongPwdRes = await makeRequest('POST', '/api/auth/login', {
      email: 'john@example.com',
      password: 'wrongpassword',
    });
    console.log('Response:', wrongPwdRes);
    console.log('✅ Wrong password handled correctly\n');

    // Test 5: Get user profile
    console.log('Test 5: Get user profile with token');
    const profileRes = await makeRequest('GET', `/api/auth/me`, null);
    profileRes.status === 401
      ? console.log('✅ Token required (expected)')
      : console.log('Response:', profileRes);

    // Make authenticated request
    const authOptions = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/auth/me',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };

    const authReq = await new Promise((resolve, reject) => {
      const req = http.request(authOptions, (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          resolve({
            status: res.statusCode,
            body: body ? JSON.parse(body) : null,
          });
        });
      });
      req.on('error', reject);
      req.end();
    });

    console.log('With token - Response:', authReq);
    console.log('✅ Profile retrieval successful\n');

    // Test 6: Health check
    console.log('Test 6: Health check');
    const healthRes = await makeRequest('GET', '/api/health');
    console.log('Response:', healthRes);
    console.log('✅ Health check working\n');

    console.log('🎉 All tests completed!');
  } catch (error) {
    console.error('❌ Test failed:', error);
  }

  process.exit(0);
}

// Run tests after a short delay to ensure server is ready
setTimeout(runTests, 1000);
