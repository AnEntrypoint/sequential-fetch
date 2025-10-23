# Express REST API Server

A powerful and secure REST API server built with Node.js and Express, featuring user management, authentication, and data persistence.

## Features

- **User Management**: Full CRUD operations for user data
- **Authentication**: Secure JWT-based authentication system
- **Data Persistence**: JSON file-based storage with automatic backup
- **Input Validation**: Comprehensive request validation and sanitization
- **Error Handling**: Robust error handling with proper HTTP status codes
- **Security**: Password hashing, rate limiting, and security headers
- **CORS Support**: Configurable cross-origin resource sharing
- **Logging**: Structured logging with different levels
- **Testing**: Unit and integration tests
- **Documentation**: OpenAPI/Swagger API documentation

## File Structure

```
express-api-server/
├── src/
│   ├── app.js              # Express application setup
│   ├── config/
│   │   ├── auth.js         # JWT configuration
│   │   ├── database.js     # Database configuration
│   │   ├── cors.js         # CORS configuration
│   │   ├── index.js        # Configuration exports
│   │   └── server.js       # Server configuration
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   ├── healthController.js # Health check logic
│   │   └── userController.js   # User CRUD logic
│   ├── middleware/
│   │   ├── auth.js         # Authentication middleware
│   │   ├── errorHandler.js    # Global error handler
│   │   ├── logger.js       # Request logging
│   │   └── validation.js   # Input validation
│   ├── models/
│   │   ├── User.js         # User data model
│   │   └── database.js     # Database connection
│   ├── routes/
│   │   ├── auth.js         # Authentication routes
│   │   ├── health.js       # Health check routes
│   │   ├── index.js        # Route aggregation
│   │   └── users.js        # User management routes
│   ├── services/
│   │   ├── authService.js  # Authentication business logic
│   │   ├── userService.js  # User business logic
│   │   └── validationService.js # Validation helpers
│   └── utils/
│       ├── logger.js       # Logging utilities
│       └── security.js     # Security utilities
├── tests/
│   ├── auth.test.js        # Authentication tests
│   ├── users.test.js       # User management tests
│   └── utils/
│       └── testHelpers.js  # Test utilities
├── data/
│   ├── users.json          # User data storage
│   └── users.backup.json   # Backup storage
├── logs/
│   ├── app.log             # Application logs
│   ├── error.log           # Error logs
│   └── access.log          # Access logs
├── docs/
│   └── api.js              # API documentation
├── package.json            # Dependencies and scripts
├── server.js               # Application entry point
├── .env.example            # Environment variables template
└── README.md               # This file
```

## Installation

1. Clone or download the project
2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Edit `.env` file with your configuration:
```env
PORT=3000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
LOG_LEVEL=info
```

## Usage

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Testing
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Linting and Formatting
```bash
# Check code style
npm run lint

# Fix code style issues
npm run lint:fix

# Format code
npm run format
```

## API Endpoints

### Health Check
- `GET /health` - Check server health and uptime

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user profile

### User Management
- `GET /api/users` - Get all users (with pagination)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### API Documentation
- `GET /docs` - Interactive API documentation

## Example API Usage

### Register a User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

### Get Users (Authenticated)
```bash
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Configuration

### Environment Variables
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (development/production)
- `JWT_SECRET`: Secret key for JWT signing
- `JWT_EXPIRES_IN`: JWT expiration time
- `LOG_LEVEL`: Logging level (error, warn, info, debug)

### CORS Configuration
CORS is configured to allow requests from any origin in development. In production, update the CORS configuration in `src/config/cors.js` to restrict origins.

## Security Features

- **Password Hashing**: Uses bcrypt for secure password storage
- **JWT Authentication**: Token-based authentication with expiration
- **Rate Limiting**: Prevents brute force attacks
- **Input Validation**: Comprehensive request validation
- **Security Headers**: Sets security-related HTTP headers
- **Error Sanitization**: Prevents information leakage in error messages

## Logging

The application uses structured logging with different levels:
- **Error**: Error messages (logs/error.log)
- **Access**: HTTP access logs (logs/access.log)
- **App**: Application logs (logs/app.log)

## Data Storage

The application uses JSON file-based storage with automatic backup:
- Primary data: `data/users.json`
- Backup data: `data/users.backup.json`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## License

This project is open source and available under the MIT License.
