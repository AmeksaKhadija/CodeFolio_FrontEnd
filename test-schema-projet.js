const http = require('http');

const query = {
    query: `query { 
    __type(name: "Projet") { 
      fields { 
        name type { kind name ofType { kind name } }
      } 
    } 
  }`
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

    res.on('data', (chunk) => {
        responseData += chunk;
    });

    res.on('end', () => {
        try {
            const parsed = JSON.parse(responseData);
            console.log('Projet Type Fields:');
            console.log(JSON.stringify(parsed, null, 2));
        } catch (e) {
            console.log('Could not parse:', responseData);
        }
    });
});

req.write(data);
req.end();
