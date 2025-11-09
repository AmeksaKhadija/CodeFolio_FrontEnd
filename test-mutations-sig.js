const http = require('http');

const query = {
    query: `query { 
    __type(name: "Mutation") { 
      fields { 
        name 
        args {
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
            console.log('\n===== Mutation Fields =====');
            if (parsed.data && parsed.data.__type) {
                parsed.data.__type.fields.forEach(field => {
                    // Show update, create, delete fields
                    if (field.name.includes('update') || field.name.includes('create') || field.name.includes('delete')) {
                        console.log(`\n${field.name}(`);
                        field.args.forEach(arg => {
                            console.log(`  ${arg.name}: ${arg.type.kind} ${arg.type.name || arg.type.ofType.name}`);
                        });
                        console.log(`):`);
                    }
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
