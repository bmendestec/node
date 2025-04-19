import fastify, { FastifyInstance, FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import cors from '@fastify/cors';
import fastifyCookie from '@fastify/cookie';
// import tarefasRoutes from './routes/tarefas.js';
import userRoutes from '../web/routes/Users.js';

const server: FastifyInstance = fastify();

await server.register(cors, {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
});

await server.register(fastifyCookie,{
    secret: process.env.COOKIE_SECRET || 'default_secret',

});

userRoutes(server);

server.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    console.error(error); // Log detalhado do erro no terminal
    reply.status(500).send({ error: 'Internal Server Error', message: error.message });
});

// Registra as rotas de tarefas
// tarefasRoutes(server, database);
const host = '127.0.0.1';
const port = 8080;

// Inicia o servidor
server.listen({ host, port }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server running at ${address}`);
});