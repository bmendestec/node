# Task Management Backend Application

This is a backend application for managing tasks and users, built with **Node.js**, **Fastify**, and **PostgreSQL**. It follows the **Hexagonal Architecture (Ports and Adapters)** pattern to ensure scalability, maintainability, and testability.

---

## Features

- **User Management**: Create, list, edit, and delete users.
- **Task Management**: Create, list, edit, and delete tasks.
- **Authentication**: Secure user authentication using hashed passwords with `bcrypt`.
- **Error Handling**: Centralized error handling for consistent and clear error responses.
- **Database Integration**: PostgreSQL for data persistence with optimized queries.
- **Scalable Architecture**: Hexagonal Architecture for better separation of concerns.
- **CORS Support**: Configured to allow frontend communication.

---

## Project Structure

The project is organized as follows:

```
└── task-app-backend/
    ├── core/                # Core of the application (domain)
    │   ├── entities/        # Domain entities
    │   │   ├── User.ts
    │   │   ├── Task.ts
    │   ├── use-cases/       # Use cases (business rules)
    │   │   ├── CreateUser.ts
    │   │   ├── ListUsers.ts
    │   │   ├── EditUser.ts
    │   │   ├── DeleteUser.ts
    │   │   ├── CreateTask.ts
    │   │   ├── ListTasks.ts
    │   │   ├── EditTask.ts
    │   │   ├── DeleteTask.ts
    ├── ports/               # Interfaces (contracts) for the core
    │   ├── UserRepository.ts
    │   ├── TaskRepository.ts
    ├── adapters/            # Implementations of the interfaces
    │   ├── postgres/        # Adapter for PostgreSQL
    │   │   ├── UserRepositoryPostgres.ts
    │   │   ├── TaskRepositoryPostgres.ts
    ├── infra/               # Infrastructure layer
    │   ├── database/        # Database configuration
    │   │   ├── db.ts
    │   ├── redis/        # Redis configuration
    │   │   ├── redis.ts
    │   ├── web/             # Web layer (routes and server)
    │   │   ├── routes/
    │   │   │   ├── Users.ts
    │   │   │   ├── Login.ts
    │   │   │   ├── TasksRoutes.ts
    │   │   ├── server.ts    # Main server configuration
    ├── auth/                # Authentication logic
    │   ├── authController.ts
    │   ├── authMiddleware.ts
    ├── utils/               # Utilities and helpers
    ├── .env                 # Environment variables
    ├── package.json         # Project dependencies
    ├── README.md            # Project documentation
```

---

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Fastify**: High-performance web framework for handling HTTP requests.
- **PostgreSQL**: Relational database for data persistence.
- **TypeScript**: Strongly typed JavaScript for better code quality.
- **bcrypt**: Library for hashing passwords securely.
- **CORS**: Cross-Origin Resource Sharing configuration for frontend-backend communication.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/task-app-backend.git
   cd task-app-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     DATABASE_URL=your_postgresql_connection_string
     HOST=localhost
     PORT=3000
     ```

4. Run database migrations (if applicable):
   ```bash
   npm run migrate
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

---

## API Endpoints

### User Routes
- `POST /users`: Create a new user.
- `GET /users`: List all users.
- `PUT /users/:id`: Edit a user.
- `DELETE /users/:id`: Delete a user.

### Task Routes
- `POST /tasks`: Create a new task.
- `GET /tasks`: List all tasks.
- `PUT /tasks/:id`: Edit a task.
- `DELETE /tasks/:id`: Delete a task.

### Authentication Routes
- `POST /login`: Authenticate a user and generate a token.

---

## Error Handling

The application uses a centralized error handler to ensure consistent error responses. Example response for an error:
```json
{
  "error": "Internal Server Error",
  "message": "Database error in Create method in TaskRepositoryPostgres"
}
```

---

## Future Improvements

- Add unit and integration tests for all use cases.
- Implement pagination for listing users and tasks.
- Add support for task prioritization and filtering.
- Improve logging with structured logs for better debugging.

---

## License

This project is licensed under the MIT License.
