# CloudDeploy CICD Azure

A Node.js REST API with SQLite3 database and GitHub Actions CI/CD pipeline.

## Features

- 🔐 User authentication with JWT
- 🗄️ SQLite3 database
- 🔒 Password hashing with bcryptjs
- 🧪 Jest testing framework
- 📋 ESLint for code quality
- 🚀 GitHub Actions CI/CD pipeline
- 🐳 Docker support
- 🔒 Security scanning

## Prerequisites

- Node.js 16.x or higher
- npm or yarn
- Docker (optional)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd CloudDeploy\ CICD\ AZure
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```
PORT=3000
JWT_SECRET=your-secret-key-here
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The API will be available at `http://localhost:3000`

## Testing

Run unit tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Generate coverage report:
```bash
npm run test:coverage
```

## Linting

Check code quality:
```bash
npm run lint
```

## API Endpoints

### Authentication Routes

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get User Profile
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Task Routes

#### Create Task
```http
POST /api/tasks
Content-Type: application/json

{
  "title": "Task title",
  "description": "Optional description",
  "completed": false
}
```

#### List Tasks
```http
GET /api/tasks
```

#### Get Task
```http
GET /api/tasks/:id
```

#### Update Task
```http
PUT /api/tasks/:id
Content-Type: application/json

{
  "title": "New title",
  "completed": true
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
```


## Docker

### Build Image
```bash
docker build -t cloudeploy-api:latest .
```

### Run Container
```bash
docker run -p 3000:3000 -e JWT_SECRET=your-secret cloudeploy-api:latest
```

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment:

- **CI Pipeline** (`.github/workflows/ci.yml`): Runs tests and linting on push/PR
- **Build & Deploy** (`.github/workflows/deploy.yml`): Builds Docker image and pushes to registry
- **Security Scan** (`.github/workflows/security.yml`): Runs security audits and dependency checks

### Setup GitHub Secrets

Add these secrets to your GitHub repository:
- `DOCKER_USERNAME`: Docker Hub username
- `DOCKER_PASSWORD`: Docker Hub password or token
- `JWT_SECRET`: JWT secret key

## Project Structure

```
CloudDeploy CICD AZure/
├── .github/
│   └── workflows/           # GitHub Actions workflows
│       ├── ci.yml
│       ├── deploy.yml
│       └── security.yml
├── src/
│   ├── routes/              # API routes
│   │   └── auth.js
│   ├── models/              # Database models
│   │   └── User.js
│   ├── config/              # Configuration
│   │   └── db.js
│   └── server.js            # Express app
├── tests/                   # Test files
│   ├── auth.test.js
│   └── setup.js
├── data/                    # SQLite database
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── Dockerfile               # Docker configuration
├── jest.config.js           # Jest configuration
├── .eslintrc.json          # ESLint configuration
└── package.json             # Project dependencies
```

## Development Workflow

1. Create a feature branch:
```bash
git checkout -b feature/your-feature
```

2. Make your changes and commit:
```bash
git add .
git commit -m "Add your feature"
```

3. Push to GitHub:
```bash
git push origin feature/your-feature
```

4. Create a Pull Request

5. CI/CD pipeline will automatically run tests and checks

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 3000 |
| JWT_SECRET | Secret key for JWT signing | your-secret-key |

## Error Handling

All endpoints return JSON responses with appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

## License

ISC
