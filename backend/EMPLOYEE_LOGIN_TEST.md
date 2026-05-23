# Employee Login Testing Guide

## 🔧 What Was Fixed

The employee login system now works as follows:

1. **When Admin Creates Employee**: A User account is automatically created with:
   - Email: `firstname@roletrack.com` (e.g., `john@roletrack.com`)
   - Password: `roletrack123` (default)
   - Role: `employee`

2. **Login Options**: Employees can login using:
   - Full email: `john@roletrack.com`
   - Just username: `john` (system auto-appends @roletrack.com)
   - Original email if provided

3. **Status Sync**: Employee status changes sync with User account

## 🧪 Testing Steps

### Step 1: Start Backend Server
```bash
cd backend
npm start
```

### Step 2: Login as Admin
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@roletrack.com",
    "password": "admin123"
  }'
```

Save the token from response: `YOUR_ADMIN_TOKEN`

### Step 3: Create New Employee
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@company.com",
    "phone": "1234567890",
    "department": "Engineering",
    "position": "Software Engineer",
    "salary": 75000,
    "joinDate": "2024-01-15"
  }'
```

**Response will include login credentials:**
```json
{
  "success": true,
  "message": "Employee created successfully",
  "data": {
    "employee": {...},
    "loginCredentials": {
      "email": "john@roletrack.com",
      "password": "roletrack123",
      "message": "Please share these credentials with the employee"
    }
  }
}
```

### Step 4: Test Employee Login (Option 1 - Full Email)
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@roletrack.com",
    "password": "roletrack123"
  }'
```

### Step 5: Test Employee Login (Option 2 - Username Only)
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john",
    "password": "roletrack123"
  }'
```

Both should work and return:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@roletrack.com",
      "role": "employee"
    },
    "token": "..."
  }
}
```

### Step 6: Sync Existing Employees (If you have old data)
```bash
curl -X POST http://localhost:3000/api/employees/sync-users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

This will create User accounts for all employees who don't have one yet.

## 🎯 Testing from Frontend

### 1. Login Screen
- Employee enters: `john` or `john@roletrack.com`
- Password: `roletrack123`
- Should successfully login and redirect to employee dashboard

### 2. Admin Dashboard - Create Employee
- Fill employee form
- Submit
- System should show success with login credentials
- Admin should share credentials with employee

## 🔒 Default Credentials

All new employees get:
- **Email Format**: `{firstname}@roletrack.com`
- **Default Password**: `roletrack123`
- **Role**: `employee`

**⚠️ Important**: Employees should change their password after first login (implement password change feature)

## 📋 Checklist

- [ ] Admin can create employee
- [ ] System generates login credentials automatically
- [ ] Employee can login with `firstname@roletrack.com`
- [ ] Employee can login with just `firstname`
- [ ] Login redirects to correct dashboard
- [ ] Employee status sync (active/inactive) works
- [ ] Existing employees can be synced with user accounts
- [ ] Invalid credentials show proper error message

## 🐛 Troubleshooting

### "Invalid credentials" error
1. Check if employee was created successfully
2. Verify User account exists: Check database `users` collection
3. Try full email format: `firstname@roletrack.com`
4. Ensure password is: `roletrack123`
5. Check employee status is `active`

### Employee not found
1. Run sync endpoint to create user accounts for existing employees
2. Check if employee has `userId` field populated

### Database connection error
1. Ensure MongoDB is running
2. Check `MONGODB_URI` in `.env` file
3. Check network connectivity

## 🔐 Security Notes

1. **Change Default Password**: Implement password change feature
2. **Production**: Use environment variable for default password
3. **Email Notification**: Send welcome email with credentials (future enhancement)
4. **Password Policy**: Enforce strong passwords on change
