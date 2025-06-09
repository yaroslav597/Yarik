import fetch from 'node-fetch';

async function testCorsPreflight() {
  const url = 'http://localhost:5000/api/register';
  const options = {
    method: 'OPTIONS',
    headers: {
      'Origin': 'http://localhost:3000',
      'Access-Control-Request-Method': 'POST',
      'Access-Control-Request-Headers': 'Content-Type, Authorization'
    }
  };

  try {
    const response = await fetch(url, options);
    console.log('Status:', response.status);
    console.log('Headers:');
    response.headers.forEach((value, name) => {
      console.log(name + ': ' + value);
    });
  } catch (error) {
    console.error('Error during CORS preflight test:', error);
  }
}

testCorsPreflight();
