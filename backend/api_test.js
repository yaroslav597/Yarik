import fetch from 'node-fetch';

const baseUrl = 'http://localhost:5000';

async function testRegister() {
  const url = baseUrl + '/api/register';
  const userData = {
    email: 'testuser@example.com',
    username: 'testuser',
    password: 'testpassword'
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    console.log('Register response:', data);
  } catch (error) {
    console.error('Error during register test:', error);
  }
}

async function runTests() {
  await testRegister();
}

runTests();
