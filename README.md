# Node.js Application

## Project Structure

The project follows the Hexagonal Architecture (Ports and Adapters) pattern, organized as follows:

```
└── node/
    ├── core/                # Core of the application (domain)
    │   ├── entities/        # Domain entities
    │   │   ├── Users.ts
    │   ├── use-cases/       # Use cases (business rules)
    │   │   ├── CreateUser.ts
    │   │   ├── ListUsers.ts
    │   │   ├── EditUser.ts
    │   │   ├── DeleteUser.ts
    ├── ports/               # Interfaces (contracts) for the core
    │   ├── UserRepository.ts
    ├── adapters/            # Implementations of the interface
    │   ├── postgres/        # Adapter for PostgreSQL
    │   │   ├── UserRepositoryPostgres.ts
    ├── infra/               # Infrastructure layer
    │   ├── redis/           # Redis configuration
    │   │   ├── index.ts
    │   ├── web/             # Web layer (routes and server)
    │   │   ├── routes/
    │   │   │   ├── Users.ts
    │   │   │   ├── Login.ts
    │   │   ├── server.ts    # Main server configuration
    ├── auth/                # Authentication logic
    │   ├── authController.ts
    │   ├── authMiddleware.ts
    ├── utils/               # Utilities and helpers
    │   ├── db.ts            # Database configuration
    ├── .env                 # Environment variables
    ├── package.json         # Project dependencies
    ├── README.md            # Project documentation
```

## How to Run the Application

1. **Install Dependencies**  
   Run the following command to install all required dependencies:
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**  
   Create a `.env` file in the root directory and configure the necessary environment variables. Example:
   ```
   PGHOST=your_postgres_host
   PGDATABASE=your_database_name
   PGUSER=your_database_user
   PGPASSWORD=your_database_password
   JWT_SECRET=your_jwt_secret
   REDIS_HOST=127.0.0.1
   REDIS_PORT=6379
   ```

3. **Start the Application**  
   Use the following command to start the application:
   ```bash
   npm start
   ```

4. **Run in Development Mode**  
   For development, use:
   ```bash
   npm run dev
   ```

5. **Run Tests**  
   Execute the test suite with:
   ```bash
   npm test
   ```

## API Endpoints

### Authentication
- **POST /login**  
  Authenticate a user and return a JWT token.

- **GET /logout**  
  Invalidate the user's token.

- **GET /validate-token**  
  Check if the token is valid.

### Users
- **POST /usuarios**  
  Create a new user.

- **GET /usuarios**  
  List all users (protected route).

- **PUT /usuarios/:id**  
  Edit a user by ID (protected route).

- **DELETE /usuarios/:id**  
  Delete a user by ID (protected route).

## Additional Notes

- Ensure Node.js and npm are installed on your system.
- Redis is used to store tokens in memory for authentication purposes. Ensure Redis is running on the configured host and port.
- Refer to the `/docs` folder for detailed API documentation.
- Contributions are welcome! Feel free to submit a pull request.
- For issues or questions, open a ticket in the repository's issue tracker.
