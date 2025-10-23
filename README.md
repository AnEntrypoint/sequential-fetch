# Node.js API Todo Manager

A simple REST API for managing todo items, built with Node.js and Express.js. This project demonstrates API development best practices including error handling, request validation, and proper HTTP status codes.

## 🚀 Features

- **Complete CRUD Operations**: Create, Read, Update, and Delete todos
- **Request Validation**: Ensures data integrity with input validation
- **Error Handling**: Comprehensive error handling with meaningful messages
- **RESTful API**: Follows REST conventions for API design
- **Clean Code Structure**: Well-organized and maintainable codebase
- **Status Management**: Track completion status of todos

## 📁 Project Structure

```
node-todo-api/
├── server.js           # Main application server
├── api/
│   ├── todo.js         # Todo API endpoints
│   └── index.js        # API route aggregator
├── model/
│   └── todo.js         # Todo data model and logic
├── package.json        # Project dependencies and scripts
└── README.md           # This documentation file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (version 12 or higher)
- npm (comes with Node.js)

### Installation Steps

1. **Clone or download the project**
   ```bash
   # If you have the project files locally, navigate to the project directory
   cd node-todo-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Verify installation**
   - Open your browser and navigate to `http://localhost:3000`
   - You should see the message: "Welcome to Node.js Todo API"

## 📚 API Endpoints

The API provides the following endpoints for managing todos:

### Base URL
`http://localhost:3000`

### 1. Get All Todos
```http
GET /api/todos
```

**Response Example:**
```json
[
  {
    "id": 1,
    "title": "Learn Node.js",
    "completed": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### 2. Create a New Todo
```http
POST /api/todos
Content-Type: application/json

{
  "title": "Your todo title"
}
```

**Response Example:**
```json
{
  "id": 2,
  "title": "Your todo title",
  "completed": false,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### 3. Get a Specific Todo
```http
GET /api/todos/:id
```

**Response Example:**
```json
{
  "id": 1,
  "title": "Learn Node.js",
  "completed": false,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### 4. Update a Todo
```http
PUT /api/todos/:id
Content-Type: application/json

{
  "title": "Updated todo title",
  "completed": true
}
```

**Response Example:**
```json
{
  "id": 1,
  "title": "Updated todo title",
  "completed": true,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### 5. Delete a Todo
```http
DELETE /api/todos/:id
```

**Response Example:**
```json
{
  "message": "Todo deleted successfully"
}
```

### 6. Delete All Todos
```http
DELETE /api/todos
```

**Response Example:**
```json
{
  "message": "All todos deleted successfully"
}
```

## 🧪 Testing the API

You can test the API using various tools:

### Using curl (Command Line)
```bash
# Get all todos
curl http://localhost:3000/api/todos

# Create a new todo
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "My first todo"}'

# Get a specific todo
curl http://localhost:3000/api/todos/1

# Update a todo
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# Delete a todo
curl -X DELETE http://localhost:3000/api/todos/1
```

### Using Postman or Insomnia
1. Import the collection or create requests manually
2. Set the base URL to `http://localhost:3000`
3. Use the HTTP methods and endpoints as described above

### Using JavaScript fetch
```javascript
// Create a todo
fetch('http://localhost:3000/api/todos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ title: 'Learn REST APIs' })
})
.then(response => response.json())
.then(data => console.log(data));

// Get all todos
fetch('http://localhost:3000/api/todos')
.then(response => response.json())
.then(data => console.log(data));
```

## 📊 Error Handling

The API includes comprehensive error handling:

### Validation Errors (400 Bad Request)
```json
{
  "error": "Title is required"
}
```

### Not Found Errors (404 Not Found)
```json
{
  "error": "Todo not found"
}
```

### Server Errors (500 Internal Server Error)
```json
{
  "error": "Internal server error"
}
```

## 🔧 Development

### Available Scripts
- `npm start` - Start the server in production mode
- `npm test` - Run tests (when test files are added)
- `npm run dev` - Start server in development mode (if configured)

### Adding New Features
The project structure makes it easy to add new features:
- **Routes**: Add new API endpoints in the `api/` directory
- **Models**: Add data models and business logic in the `model/` directory
- **Middleware**: Add Express middleware in `server.js`

## 📝 Data Storage

**Note**: This project uses an in-memory array for data storage, which means:
- Data is lost when the server restarts
- Suitable for development and testing purposes
- For production use, consider integrating a database (MongoDB, PostgreSQL, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Related Technologies

- **Node.js**: JavaScript runtime for server-side development
- **Express.js**: Web application framework for Node.js
- **REST**: Architectural style for designing networked applications
- **JSON**: Data format for API requests and responses

## 📞 Support

If you have any questions or need help with this project, feel free to open an issue on GitHub or contact the project maintainers.
