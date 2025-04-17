import { UserRepositoryPostgres } from '../adapters/postgres/UserRepositoryPostgres.js';
import { CreateUser } from '../core/use-case/CreateUser.js';

export default async function userRoutes(server) {
    const userRepository = new UserRepositoryPostgres();
    
    server.post('/usuarios', async (request, reply) => {
        const createUser = new CreateUser(userRepository);
        const user = await createUser.execute(request.body);
        return reply.status(201).send(user);
    })

    server.get('/usuarios', async (request, reply) => {
        const user = await userRepository.list(request.query.search || '');
        return reply.send(user);
    })

    server.put('/usuarios/:id', async (request, reply) => {
        const user = await userRepository.edit(request.params.id, request.body);
        return reply.status(200).send(user);
    })

    server.delete('/usuarios/:id', async (request, reply) => {
        const user = await userRepository.delete(request.params.id);
        return reply.status(204).send(user);
    });
}