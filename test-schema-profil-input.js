const http = require('http');

const query = {
    query: `query { 
    __type(name: "ProfilInput") { 
      inputFields { 
        name 
        type { 
          kind 
          name 
          ofType { 
            kind 
            name 
          } 
        }
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
            console.log('\n===== ProfilInput Type Fields =====');
            if (parsed.data && parsed.data.__type) {
                parsed.data.__type.inputFields.forEach(field => {
                    console.log(`${field.name}: ${field.type.kind} ${field.type.name || field.type.ofType.name}`);
                });
            } else {
                console.log('Error:', parsed.errors);
            }
        } catch (e) {
            console.log('Parse Error:', e.message);
        }
    });
});

req.on('error', (e) => {
    console.log('Request Error:', e);
});

req.write(data);
req.end();
