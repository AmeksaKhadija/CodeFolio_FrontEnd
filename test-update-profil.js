const http = require('http');

// Test mutation
const query = {
    query: `mutation UpdateProfil($id: ID!, $input: ProfilInput!) {
    updateProfil(id: $id, input: $input) {
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
        id: "1",
        input: {
            nom: "Ameksa",
            prenom: "Khadija",
            titre: "Full Stack Developer",
            bio: "Passionate about web development",
            email: "khadija@example.com",
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
            console.log('\n===== UPDATE_PROFIL Mutation Result =====');
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
