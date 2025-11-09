@echo off
REM Test CREATE_PROJET mutation

echo.
echo === Testing CREATE_PROJET mutation ===
echo.

powershell -Command ^
"$body = @{ ^
  query = 'mutation CreateProjet(\$input: ProjetInput!) { createProjet(input: \$input) { id titre } }'; ^
  variables = @{ ^
    input = @{ ^
      titre = 'Test Project'; ^
      description = 'Test Description'; ^
      dateDebut = '2025-01-01' ^
    } ^
  } ^
} | ConvertTo-Json -Depth 10; ^
$response = Invoke-WebRequest -Uri 'http://localhost:4000/graphql' -Method POST ^
  -Headers @{'Content-Type'='application/json'} ^
  -Body \$body -ErrorAction Continue 2>&1; ^
Write-Host \$response.Content"

echo.
echo === Done ===
pause
