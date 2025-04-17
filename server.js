import { fastify } from 'fastify';
import cors from '@fastify/cors';
// import tarefasRoutes from './routes/tarefas.js';
import userRoutes from './routes/Users.js';

const server = fastify();

await server.register(cors, {
    origin: 'http://localhost:5173', // Permite requisições desta origem
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
});

// Registra as rotas de usuários
// usuariosRoutes(server, database);
userRoutes(server);

server.setErrorHandler((error, request, reply) => {
    console.error(error); // Log detalhado do erro no terminal
    reply.status(500).send({ error: 'Internal Server Error', message: error.message });
});

// Registra as rotas de tarefas
// tarefasRoutes(server, database);

server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server running at ${address}`);
});