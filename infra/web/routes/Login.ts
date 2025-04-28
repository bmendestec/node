import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { loginController } from '../../../auth/authController.js';

export default async function loginRoutes(server: FastifyInstance) {
    server.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
        return loginController(request, reply, 'login')
    });
    server.get('/logout', async (request: FastifyRequest, reply: FastifyReply) => {
        return loginController(request, reply, 'logout')
    });

    server.get('/validate-token', async (request: FastifyRequest, reply: FastifyReply) => {
        return loginController(request, reply, 'validate-token')
    });
}