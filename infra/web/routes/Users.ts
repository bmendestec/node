import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { UserRepositoryPostgres } from '../../../adapters/postgres/UserRepositoryPostgres.js';
import { CreateUser } from '../../../core/use-case/CreateUser.js';
import { User } from '../../../types/User.js';

export default async function userRoutes(server: FastifyInstance): Promise<void> {
    const userRepository = new UserRepositoryPostgres();
    
    server.post('/usuarios', async (request: FastifyRequest<{ Body: User }>, reply: FastifyReply) => {
        const createUser = new CreateUser({userRepository});
        const user = await createUser.execute(request.body);
        return reply.status(201).send(user);
    })

    server.get('/usuarios', async (request: FastifyRequest<{ Querystring: { search?: string } }>, reply: FastifyReply) => {
        const user = await userRepository.list(request.query.search || '');
        return reply.send(user);
    })

    server.put('/usuarios/:id', async (request: FastifyRequest<{ Params: { id: number }; Body: User }>, reply: FastifyReply) => {
        const user = await userRepository.edit(request.params.id, request.body);
        return reply.status(200).send(user);
    })

    server.delete('/usuarios/:id', async (request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) => {
        const user = await userRepository.delete(request.params.id);
        return reply.status(204).send(user);
    });
}