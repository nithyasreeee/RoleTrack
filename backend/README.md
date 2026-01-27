# RoleTrack Backend API

Production-ready backend API for RoleTrack Employee Management System.

## 🚀 Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **helmet** - Security headers
- **cors** - Cross-origin resource sharing
- **express-rate-limit** - Rate limiting

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── employeeController.js # Employee CRUD logic
├── middleware/
│   ├── auth.js              # JWT verification & authorization
│   ├── errorHandler.js      # Global error handler
│   └── validation.js        # Input validation rules
├── models/
│   ├── User.js              # User schema
│   └── Employee.js          # Employee schema
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   └── employeeRoutes.js    # Employee endpoints
├── .env.example             # Environment variables template
├── app.js                   # Express app configuration
├── server.js                # Server entry point
└── package.json             # Dependencies
```

## 🔧 Installation

1. **Install dependencies:**
```bash
cd backend
npm install
```

2. **Setup environment variables:**
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/roletrack
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173,https://your-frontend.vercel.app
```

3. **Start MongoDB** (if running locally):
```bash
mongod
```

4. **Run the server:**
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
Development: http://localhost:5000/api
Production: https://your-backend.com/api
```

### Authentication Endpoints

#### 1. Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "employee"
}

Response (201):
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "employee"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 2. Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response (200):
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "employee"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 3. Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "employee",
      "status": "active"
    }
  }
}
```

### Employee Endpoints

#### 1. Get All Employees (with pagination & filters)
```http
GET /api/employees?page=1&limit=10&search=john&department=Engineering&status=active
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "employees": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "phone": "+1234567890",
        "department": "Engineering",
        "position": "Senior Developer",
        "status": "active",
        "joinDate": "2024-01-15T00:00:00.000Z",
        "fullName": "John Doe"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50,
      "itemsPerPage": 10,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

#### 2. Get Single Employee
```http
GET /api/employees/:id
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "employee": {
      "_id": "507f1f77bcf86cd799439011",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "department": "Engineering",
      "position": "Senior Developer",
      "status": "active"
    }
  }
}
```

#### 3. Create Employee
```http
POST /api/employees
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "department": "HR",
  "position": "HR Manager",
  "status": "active",
  "joinDate": "2024-01-20",
  "salary": 75000
}

Response (201):
{
  "success": true,
  "message": "Employee created successfully",
  "data": {
    "employee": { ... }
  }
}
```

#### 4. Update Employee
```http
PUT /api/employees/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "position": "Lead Developer",
  "salary": 95000
}

Response (200):
{
  "success": true,
  "message": "Employee updated successfully",
  "data": {
    "employee": { ... }
  }
}
```

#### 5. Delete Employee
```http
DELETE /api/employees/:id
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Employee deleted successfully",
  "data": null
}
```

#### 6. Get Employee Statistics
```http
GET /api/employees/stats
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "stats": {
      "totalCount": [{ "count": 50 }],
      "statusCounts": [
        { "_id": "active", "count": 45 },
        { "_id": "inactive", "count": 5 }
      ],
      "departmentCounts": [
        { "_id": "Engineering", "count": 20 },
        { "_id": "HR", "count": 5 }
      ]
    }
  }
}
```

### Health Check
```http
GET /api/health

Response (200):
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-27T10:30:00.000Z",
  "environment": "development"
}
```

## 🔐 Authorization Rules

- **Admin**: Full access to all endpoints
- **Manager**: Can create, read, update employees
- **Employee**: Can only view their own profile

## 🛡️ Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Helmet for HTTP headers security
- CORS protection
- Rate limiting (100 requests per 15 minutes)
- MongoDB injection protection
- Input validation and sanitization

## 📦 Dependencies

```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.3",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "dotenv": "^16.3.1",
  "cors": "^2.8.5",
  "express-validator": "^7.0.1",
  "helmet": "^7.1.0",
  "express-rate-limit": "^7.1.5",
  "express-mongo-sanitize": "^2.2.0",
  "morgan": "^1.10.0"
}
```

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/roletrack
JWT_SECRET=very_secure_random_string_here
JWT_EXPIRE=7d
CORS_ORIGIN=https://your-frontend.vercel.app
```

### Deployment Platforms

**Heroku:**
```bash
heroku create roletrack-api
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
git push heroku main
```

**Railway:**
- Connect GitHub repository
- Add environment variables in dashboard
- Deploy automatically

**AWS/DigitalOcean:**
- Set up Node.js server
- Install dependencies
- Configure nginx reverse proxy
- Set up PM2 for process management

## 🧪 Testing with Postman

Import this collection URL or manually test each endpoint with the examples above.

## 📝 Notes

- Always use HTTPS in production
- Rotate JWT secrets regularly
- Set strong MongoDB passwords
- Enable MongoDB Atlas IP whitelist
- Monitor rate limits and adjust as needed
- Implement refresh tokens for better security (future enhancement)

## 📞 Support

For issues or questions, contact the development team.
