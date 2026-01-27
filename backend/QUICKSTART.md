# Quick Start Guide - RoleTrack Backend

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Setup Environment
```bash
# Copy example environment file
cp .env.example .env

# Edit .env file with your configuration
# Minimum required:
# - MONGODB_URI (your MongoDB connection string)
# - JWT_SECRET (generate a random secure string)
```

### Step 3: Start MongoDB
```bash
# If using local MongoDB:
mongod

# OR use MongoDB Atlas (cloud) - no local setup needed
# Just update MONGODB_URI in .env
```

### Step 4: Run the Server
```bash
# Development mode (with auto-reload)
npm run dev

# OR Production mode
npm start
```

Server will start at: `http://localhost:5000`

## ✅ Test the API

### Test Health Check
```bash
curl http://localhost:5000/api/health
```

### Create Admin User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@roletrack.com",
    "password": "admin123",
    "role": "admin"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@roletrack.com",
    "password": "admin123"
  }'
```

Copy the token from the response and use it for authenticated requests:

### Create Employee (with token)
```bash
curl -X POST http://localhost:5000/api/employees \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "department": "Engineering",
    "position": "Software Engineer",
    "status": "active",
    "joinDate": "2024-01-15"
  }'
```

## 📱 Connect Frontend

1. Update frontend `.env` file:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

2. Use the integration code in `FRONTEND_INTEGRATION.js`

3. Start making API calls!

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check if MongoDB is running: `mongod`
- Verify MONGODB_URI in `.env`
- For Atlas, check IP whitelist

### Port Already in Use
- Change PORT in `.env` file
- OR kill process: `lsof -ti:5000 | xargs kill` (Mac/Linux)

### JWT Token Invalid
- Check JWT_SECRET matches in `.env`
- Ensure token is sent in Authorization header

## 📚 Next Steps

1. Read full API documentation in `README.md`
2. Review frontend integration guide in `FRONTEND_INTEGRATION.js`
3. Customize employee schema in `models/Employee.js`
4. Add more features as needed!

## 🎯 Default Test Users

After registration, you can create these users for testing:

**Admin:**
- Email: admin@roletrack.com
- Password: admin123
- Role: admin

**Manager:**
- Email: manager@roletrack.com
- Password: manager123
- Role: manager

**Employee:**
- Email: employee@roletrack.com
- Password: emp123
- Role: employee

## 📞 Need Help?

Check the full documentation:
- Backend API: `backend/README.md`
- Frontend Integration: `backend/FRONTEND_INTEGRATION.js`
- Project Structure: See folder descriptions in README
