Node.js Application

## Project Structure

The project follows the Hexagonal Architecture (Ports and Adapters) pattern, organized as follows:

```
└── node/
    ├── core/                # Core of the application (domain)
    │   ├── entities/        # Domain entities
    │   │   ├── Users.js
    │   ├── use-cases/       # Use cases (business rules)
    │   │   ├── CreateUsers.js
    │   │   ├── ListUsers.js
    │   │   ├── EditUsers.js
    │   │   ├── DeleteUsers.js
    ├── ports/               # Interfaces (contracts) for the core
    │   ├── UserRepository.js
    ├── adapters/            # Implementations of the interface
    │   ├── postgres/        # Adapter for PostgreSQL
    │   │   ├── UserRepositoryPostgres.js
    ├── routes/              # Application routes
    │   ├── Users.js
    ├── utils/               # Utilities and helpers
    │   ├── db.js            # Database configuration
    ├── server.js            # Main server configuration
    ├── .env                 # Environment variables
    ├── package.json         # Project dependencies
```

## How to Run the Application

1. **Install Dependencies**  
   Run the following command to install all required dependencies:
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**  
   Create a `.env` file in the root directory and configure the necessary environment variables. Refer to the `/config` folder for examples.

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

## Additional Notes

- Ensure Node.js and npm are installed on your system.
- Refer to the `/docs` folder for detailed API documentation.
- Contributions are welcome! Feel free to submit a pull request.
- For issues or questions, open a ticket in the repository's issue tracker.
