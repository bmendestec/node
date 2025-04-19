import { RequestGenericInterface , FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { UserRepositoryPostgres } from '../../../adapters/postgres/UserRepositoryPostgres.js';
import { CreateUser } from '../../../core/use-case/CreateUser.js';
import { User } from '../../../types/User.js';
import { authMiddleware } from '../../../auth/authMiddleware.js';

interface getUsuariosQuery extends RequestGenericInterface {
    Querystring: {        
        search?: string;
      },
    Params: { id: number },
    Body: User,
}

export default async function userRoutes(server: FastifyInstance): Promise<void> {
    const userRepository = new UserRepositoryPostgres();

    // Rota pública: Criar um novo usuário
    server.post('/usuarios', async (request: FastifyRequest<{ Body: User }>, reply: FastifyReply) => {
        const createUser = new CreateUser({ userRepository });
        const user = await createUser.execute(request.body);
        return reply.status(201).send(user);
    });
    
    // Rotas protegidas: Listar, editar e deletar usuários
    server.get<getUsuariosQuery>('/usuarios', { preHandler: authMiddleware }, async (request, reply: FastifyReply) => {
        const user = await userRepository.list(request.query.search || '');
        return reply.send(user);
    });
    
    server.put<getUsuariosQuery>('/usuarios/:id', { preHandler: authMiddleware }, async (request, reply: FastifyReply) => {
        const user = await userRepository.edit(request.params.id, request.body);
        return reply.status(200).send(user);
    });
    
    server.delete<getUsuariosQuery>('/usuarios/:id', { preHandler: authMiddleware }, async (request, reply: FastifyReply) => {
        await userRepository.delete(request.params.id);
        return reply.status(204).send();
    });
}