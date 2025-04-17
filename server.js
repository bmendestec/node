import { fastify } from 'fastify';
import { DatabasePostgres } from './database-postgres.js';
import usuariosRoutes from './routes/usuarios.js';
import tarefasRoutes from './routes/tarefas.js';

const server = fastify();
const database = new DatabasePostgres();

// Registra as rotas de usuários
usuariosRoutes(server, database);

// Registra as rotas de tarefas
tarefasRoutes(server, database);

server.get('/health', async (request, reply) => {
    return { status: 'ok' };
});

server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server running at ${address}`);
});