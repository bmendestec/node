import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { loginController } from './authController.js';
import { UserRepositoryPostgres } from '../adapters/postgres/UserRepositoryPostgres.js';
import { User } from '../types/User.js';

interface getUserQuery {
    Querystring: {
        search?: string;
    },
    Params: { id: number },
    Body: User
}

export default async function authRoutes(server: FastifyInstance) {
    const userRepository = new UserRepositoryPostgres();

    server.post('/login', loginController);
    
    server.get<getUserQuery>('/usuarios', async (request: FastifyRequest<getUserQuery>, reply: FastifyReply) => {
        const user = await userRepository.list(request.query.search || '');
        return reply.send(user);
    });

    server.put<getUserQuery>('/usuarios/:id', async (request: FastifyRequest<getUserQuery>, reply: FastifyReply) => {
        const user = await userRepository.edit(request.params.id, request.body);
        return reply.status(200).send(user);
    });

    server.delete<getUserQuery>('/usuarios/:id', async (request: FastifyRequest<getUserQuery>, reply: FastifyReply) => {
        await userRepository.delete(request.params.id);
        return reply.status(204).send();
    });

    server.get('/logout', async (request: FastifyRequest, reply: FastifyReply) => {
        reply.clearCookie('authToken').send({ message: 'Logout successful' });
    });
}