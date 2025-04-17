import { fastify } from 'fastify';
import tarefasRoutes from './routes/tarefas.js';
import userRoutes from './routes/Users.js';

const server = fastify();

// Registra as rotas de usuários
// usuariosRoutes(server, database);
userRoutes(server);

// Registra as rotas de tarefas
// tarefasRoutes(server, database);

server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server running at ${address}`);
});