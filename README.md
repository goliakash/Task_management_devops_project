# Task_management_devops_project
#
## Backend Quick Start

1. Go to backend folder.
2. Install dependencies.
3. Make sure MongoDB is running on localhost:27017.
4. Update backend .env values.
5. Start backend server.

Commands:

cd backend
npm install
npm start

## API Routes

- POST /api/auth/register
- POST /api/auth/login
- GET /api/tasks (protected)
- POST /api/tasks (protected)

## Manual API Testing

1. Register user

curl -X POST http://localhost:5000/api/auth/register \
	-H "Content-Type: application/json" \
	-d '{"email":"test@example.com","password":"123456"}'

2. Login user

curl -X POST http://localhost:5000/api/auth/login \
	-H "Content-Type: application/json" \
	-d '{"email":"test@example.com","password":"123456"}'

Copy the token from login response.

3. Create task (protected)

curl -X POST http://localhost:5000/api/tasks \
	-H "Content-Type: application/json" \
	-H "Authorization: Bearer YOUR_TOKEN_HERE" \
	-d '{"title":"My first task","description":"Practice API testing"}'

4. Get my tasks (protected)

curl -X GET http://localhost:5000/api/tasks \
	-H "Authorization: Bearer YOUR_TOKEN_HERE"

5. Invalid token check

curl -X GET http://localhost:5000/api/tasks \
	-H "Authorization: Bearer invalid_token"
