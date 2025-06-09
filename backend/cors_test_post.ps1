$headers = @{
    "Origin" = "http://localhost:3001"
    "Content-Type" = "application/json"
}

$body = @{
    email = "test@example.com"
    username = "testuser"
    password = "testpass"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/register" -Method POST -Headers $headers -Body $body
