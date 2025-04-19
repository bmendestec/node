import { FastifyInstance } from 'fastify';
import { loginController } from '../auth/authController';

export default async function authRoutes(server: FastifyInstance) {
    server.post('/login', loginController);
}