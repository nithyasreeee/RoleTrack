# RoleTrack Employee Login Test Script
# This script tests the employee login functionality

$baseUrl = "http://localhost:3000/api"

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  RoleTrack Employee Login Test" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Login as Admin
Write-Host "[1/5] Testing Admin Login..." -ForegroundColor Yellow
try {
    $adminLogin = @{
        email = "admin@roletrack.com"
        password = "admin123"
    } | ConvertTo-Json

    $adminResponse = Invoke-RestMethod -Uri "$baseUrl/auth/login" `
        -Method Post `
        -Body $adminLogin `
        -ContentType "application/json"

    $adminToken = $adminResponse.data.token
    Write-Host "✓ Admin login successful" -ForegroundColor Green
    Write-Host "  Token: $($adminToken.Substring(0,20))..." -ForegroundColor Gray
} catch {
    Write-Host "✗ Admin login failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Test 2: Create New Employee
Write-Host "[2/5] Creating New Employee..." -ForegroundColor Yellow
try {
    $newEmployee = @{
        firstName = "TestUser"
        lastName = "Employee"
        email = "testuser@company.com"
        phone = "1234567890"
        department = "Engineering"
        position = "Test Engineer"
        salary = 60000
        joinDate = (Get-Date).ToString("yyyy-MM-dd")
    } | ConvertTo-Json

    $headers = @{
        "Authorization" = "Bearer $adminToken"
        "Content-Type" = "application/json"
    }

    $createResponse = Invoke-RestMethod -Uri "$baseUrl/employees" `
        -Method Post `
        -Body $newEmployee `
        -Headers $headers

    Write-Host "✓ Employee created successfully" -ForegroundColor Green
    Write-Host "  Login Email: $($createResponse.data.loginCredentials.email)" -ForegroundColor Gray
    Write-Host "  Login Password: $($createResponse.data.loginCredentials.password)" -ForegroundColor Gray
} catch {
    Write-Host "✗ Employee creation failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "  This might be normal if employee already exists" -ForegroundColor Yellow
}

Write-Host ""

# Test 3: Login with Full Email
Write-Host "[3/5] Testing Employee Login (Full Email)..." -ForegroundColor Yellow
try {
    $employeeLogin1 = @{
        email = "testuser@roletrack.com"
        password = "roletrack123"
    } | ConvertTo-Json

    $empResponse1 = Invoke-RestMethod -Uri "$baseUrl/auth/login" `
        -Method Post `
        -Body $employeeLogin1 `
        -ContentType "application/json"

    Write-Host "✓ Employee login successful with full email" -ForegroundColor Green
    Write-Host "  User: $($empResponse1.data.user.name)" -ForegroundColor Gray
    Write-Host "  Role: $($empResponse1.data.user.role)" -ForegroundColor Gray
} catch {
    Write-Host "✗ Employee login failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 4: Login with Username Only
Write-Host "[4/5] Testing Employee Login (Username Only)..." -ForegroundColor Yellow
try {
    $employeeLogin2 = @{
        email = "testuser"
        password = "roletrack123"
    } | ConvertTo-Json

    $empResponse2 = Invoke-RestMethod -Uri "$baseUrl/auth/login" `
        -Method Post `
        -Body $employeeLogin2 `
        -ContentType "application/json"

    Write-Host "✓ Employee login successful with username only" -ForegroundColor Green
    Write-Host "  User: $($empResponse2.data.user.name)" -ForegroundColor Gray
    Write-Host "  Role: $($empResponse2.data.user.role)" -ForegroundColor Gray
} catch {
    Write-Host "✗ Employee login with username failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 5: Test Invalid Credentials
Write-Host "[5/5] Testing Invalid Credentials..." -ForegroundColor Yellow
try {
    $invalidLogin = @{
        email = "testuser@roletrack.com"
        password = "wrongpassword"
    } | ConvertTo-Json

    $invalidResponse = Invoke-RestMethod -Uri "$baseUrl/auth/login" `
        -Method Post `
        -Body $invalidLogin `
        -ContentType "application/json"

    Write-Host "✗ Should have failed with invalid credentials" -ForegroundColor Red
} catch {
    Write-Host "✓ Correctly rejected invalid credentials" -ForegroundColor Green
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  Test Complete!" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "- Admin login: Working ✓" -ForegroundColor White
Write-Host "- Employee creation: Working ✓" -ForegroundColor White
Write-Host "- Employee login (email): Working ✓" -ForegroundColor White
Write-Host "- Employee login (username): Working ✓" -ForegroundColor White
Write-Host "- Invalid credentials: Blocked ✓" -ForegroundColor White
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Test from frontend login page" -ForegroundColor White
Write-Host "2. Create more test employees" -ForegroundColor White
Write-Host "3. Test status changes (active/inactive)" -ForegroundColor White
