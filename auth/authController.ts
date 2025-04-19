import { FastifyReply, FastifyRequest } from 'fastify';
import { loginUser } from './authService.js';

export async function loginController(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as { email: string; password: string };

    const token = await loginUser(email, password, request.userRepository);
    console.log(token);
    reply
        .setCookie('authToken', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            path: '/',
            maxAge: 3600,
        })
        .send({ message: 'Login successful' });
}