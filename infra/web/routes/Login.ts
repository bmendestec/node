import { FastifyInstance } from 'fastify';
import { loginController } from '../../../auth/authController.js';

export default async function loginRoutes(server: FastifyInstance) {
    server.post('/login', loginController);
}