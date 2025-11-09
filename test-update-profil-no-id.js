const http = require('http');

// Test mutation SANS id
const query = {
    query: `mutation UpdateProfil($input: ProfilInput!) {
    updateProfil(input: $input) {
      id
      nom
      prenom
      titre
      bio
      email
      telephone
      localisation
      photo
    }
  }`,
    variables: {
        input: {
            nom: "Test",
            prenom: "User",
            titre: "Developer",
            bio: "Test bio",
            email: "test@example.com",
            telephone: "+212612345678",
            localisation: "Casablanca",
            photo: "https://example.com/photo.jpg"
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
        'Content-Length': data.length,
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzMwNTgwNzQ1fQ.OY6bFfC5RRFP2pBxQGFnJ5LwVLLKx3RxjNSqzCQzQvA'
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
            console.log('\n===== UPDATE_PROFIL Result (WITHOUT id) =====');
            console.log(JSON.stringify(parsed, null, 2));
        } catch (e) {
            console.log('Parse Error:', e.message);
            console.log('Raw response:', responseData);
        }
    });
});

req.on('error', (e) => {
    console.log('Request Error:', e);
});

req.write(data);
req.end();
