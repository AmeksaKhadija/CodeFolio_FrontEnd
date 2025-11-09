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
            console.log('\n===== ProfilInput Fields (Complete) =====');
            if (parsed.data && parsed.data.__type) {
                parsed.data.__type.inputFields.forEach(field => {
                    const typeKind = field.type.kind;
                    const typeName = field.type.name || (field.type.ofType ? field.type.ofType.name : '?');
                    console.log(`  ${field.name}: ${typeKind} ${typeName}`);
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
