const http = require('http');

const query = {
    query: `mutation CreateExperience($input: ExperienceInput!) { 
    createExperience(input: $input) { 
      id poste entreprise description dateDebut dateFin enCours localisation competences { id nom }
    } 
  }`,
    variables: {
        input: {
            poste: "Developer",
            entreprise: "Company Inc",
            description: "Test description",
            dateDebut: "2025-01-01",
            enCours: false,
            competences: []
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

    res.on('data', (chunk) => {
        responseData += chunk;
    });

    res.on('end', () => {
        console.log('Response:');
        try {
            const parsed = JSON.parse(responseData);
            console.log(JSON.stringify(parsed, null, 2));
        } catch (e) {
            console.log(responseData);
        }
    });
});

req.on('error', (e) => {
    console.error(`Problem: ${e.message}`);
});

req.write(data);
req.end();
