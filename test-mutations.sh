#!/bin/bash

echo "=== Testing ProjetInput Schema ==="
curl -s -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { __type(name: \"ProjetInput\") { inputFields { name type { kind name ofType { kind name } } } } }"
  }' | jq '.data.ProjetInput'

echo ""
echo "=== Testing ExperienceInput Schema ==="
curl -s -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { __type(name: \"ExperienceInput\") { inputFields { name type { kind name ofType { kind name } } } } }"
  }' | jq '.data.ExperienceInput'

echo ""
echo "=== Testing CREATE_PROJET mutation ==="
curl -s -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation CreateProjet($input: ProjetInput!) { createProjet(input: $input) { id titre } }",
    "variables": {
      "input": {
        "titre": "Test Project",
        "description": "Test Description",
        "dateDebut": "2025-01-01"
      }
    }
  }' | jq '.'
