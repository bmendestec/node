import { RequestGenericInterface, FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { CreateUser } from '../../../core/use-case/user/CreateUser.js';
import { User } from '../../../core/entities/User.js';
import { authMiddleware } from '../../../auth/authMiddleware.js';
import { UserRepository } from '../../../ports/UserRepository.js';
import { ListUser } from '../../../core/use-case/user/ListUser.js';
import { EditUser } from '../../../core/use-case/user/EditUser.js';
import { DeleteUser } from '../../../core/use-case/user/DeleteUser.js';
import { FindUserById } from '../../../core/use-case/user/FindUserById.js';

interface getUsuariosQuery extends RequestGenericInterface {
    Querystring: {
        search?: string;
    },
    Params: { id: number },
    Body: User,
}

export default async function userRoutes(server: FastifyInstance, userRepository: UserRepository): Promise<void> {

    // Rota pública: Criar um novo usuário
    server.post('/usuarios', async (request: FastifyRequest<{ Body: User }>, reply: FastifyReply) => {
        const createUser = new CreateUser(userRepository);
        const user = await createUser.execute(request.body);
        console.log('Reply:', reply);
        console.log('User created:', user);
        return reply.status(201).send(user);
    });

    // Rotas protegidas: Listar, editar e deletar usuários
    server.get<getUsuariosQuery>('/usuarios', { preHandler: authMiddleware }, async (request, reply: FastifyReply) => {
        const listUser = new ListUser(userRepository);
        const users = await listUser.execute(request.query.search || '');
        
        return reply.status(200).send(users);
    });

    server.put<getUsuariosQuery>('/usuarios/:id', { preHandler: authMiddleware }, async (request, reply: FastifyReply) => {
        const editUser = new EditUser(userRepository);
        const user = await editUser.execute(request.params.id, request.body);
        return reply.status(200).send(user);
    });

    server.delete<getUsuariosQuery>('/usuarios/:id', { preHandler: authMiddleware }, async (request, reply: FastifyReply) => {
        const deleteUser = new DeleteUser(userRepository);
        await deleteUser.execute(request.params.id);
        return reply.status(204).send();
    });

    server.get<getUsuariosQuery>('/usuarios/:id', { preHandler: authMiddleware }, async (request, reply: FastifyReply) => {
        const findUserById = new FindUserById(userRepository);
        const user = await findUserById.execute(request.params.id);
        return reply.status(200).send({ message: 'Você está autenticado', user });
    });
}