import fastify, { FastifyInstance, FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import cors from '@fastify/cors';
import userRoutes from './routes/UserRoutes.js';
import loginRoutes from './routes/LoginRoutes.js';
import tasksRoutes from './routes/TasksRoutes.js';
import { UserRepositoryPostgres } from '../../adapters/postgres/UserRepositoryPostgres.js';
import { TaskRepositoryPostgres } from '../../adapters/postgres/TaskRepositoryPostgres.js';

const server: FastifyInstance = fastify();
const userRepository = new UserRepositoryPostgres();
const taskRepository = new TaskRepositoryPostgres();

await server.register(cors, {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
});

await loginRoutes(server, userRepository);
await userRoutes(server, userRepository);
await tasksRoutes(server, taskRepository);

server.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    console.error(error);
    reply.status(500).send({ error: 'Internal Server Error', message: error.message });
});

const host = process.env.HOST || 'localhost';
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Inicia o servidor
server.listen({ host, port }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server running at ${address}`);
});