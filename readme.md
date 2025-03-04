# Overview
- Frontend: Implemented with Pug templates for dynamic HTML rendering with clean, maintainable views
- Backend: Express.js REST API handling authentication, task operations and data persistence
- Database: MySQL database with custom promise-based query wrapper for clean async/await patterns
- Authentication: JWT-based session management with bcrypt password hashing for secure user access

# Features
- User authentication system with secure signup/login flows
- CRUD operations for tasks with status tracking (done, starred, deleted)
- Multi-user support with data isolation through account-based filtering
- Comment system for collaborative task management
- In-memory database option for development and testing environments

# Instructions
```
npm i
npm run start
```

# Important URLs
- Main Page http://localhost:4131/
- Create Page http://localhost:4131/create Accessible with the create button in the bottom right of the main page
- Account Page http://localhost:4131/account Accessible with the account button on the top right of the navbar
- Edit / Expanded Page http://localhost:4131/task/id Accessible with the edit button on any task

# Resolutions
Should work on anything bigger than 550x550
Tested mostly on 1600x1000

# Notes
You can use the accounts below for testing, or make your own (username, password)
- admin, admin
- user, example

I did most of my testing on admin, admin
