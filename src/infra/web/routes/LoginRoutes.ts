import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { loginController } from '../../../auth/authController.js';
import { UserRepository } from '../../../domain/repositories/UserRepository.js';

export default async function loginRoutes(server: FastifyInstance,  userRepository: UserRepository): Promise<void> {
    server.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
        return loginController(request, reply, 'login', userRepository)
    });
    server.get('/logout', async (request: FastifyRequest, reply: FastifyReply) => {
        return loginController(request, reply, 'logout', userRepository)
    });

    server.get('/validate-token', async (request: FastifyRequest, reply: FastifyReply) => {
        return loginController(request, reply, 'validate-token', userRepository)
    });
}