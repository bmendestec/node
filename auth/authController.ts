import { FastifyReply, FastifyRequest } from 'fastify';
import { loginUser } from './authService.js';

export async function loginController(request: FastifyRequest, reply: FastifyReply) {
    const { email, senha } = request.body as { email: string; senha: string };

    const token = await loginUser(email, senha);
    reply.setCookie('authToken', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        path: '/login',
        maxAge: 3600,
    }).send({ message: 'Login successful' });
}