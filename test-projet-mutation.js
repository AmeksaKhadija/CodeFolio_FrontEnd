const http = require('http');

const query = {
    query: `mutation CreateProjet($input: ProjetInput!) { 
    createProjet(input: $input) { 
      id titre description dateDebut dateFin lien
    } 
  }`,
    variables: {
        input: {
            titre: "Test Project",
            description: "Test Description",
            dateDebut: "2025-01-01",
            dateFin: "2025-12-31",
            lien: "https://example.com"
        }
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
    console.log(`Headers:`, res.headers);

    res.on('data', (chunk) => {
        responseData += chunk;
    });

    res.on('end', () => {
        console.log('Response:');
        console.log(responseData);
        try {
            const parsed = JSON.parse(responseData);
            console.log('\nParsed:');
            console.log(JSON.stringify(parsed, null, 2));
        } catch (e) {
            console.log('Could not parse as JSON');
        }
    });
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

req.write(data);
req.end();
