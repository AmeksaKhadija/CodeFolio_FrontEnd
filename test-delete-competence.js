const http = require('http');

const query = {
    query: `mutation DeleteCompetence($id: ID!) { 
    deleteCompetence(id: $id) { 
      id
    } 
  }`,
    variables: {
        id: "1"
    }
};

const data = JSON.stringify(query);

const options = {
    hostname: 'localhost',
    port: 4000,
    path: '/graphql',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    let responseData = '';

    console.log(`Status: ${res.statusCode}`);

    res.on('data', (chunk) => {
        responseData += chunk;
    });

    res.on('end', () => {
        try {
            const parsed = JSON.parse(responseData);
            console.log('Response:');
            console.log(JSON.stringify(parsed, null, 2));
        } catch (e) {
            console.log(responseData);
        }
    });
});

req.write(data);
req.end();
