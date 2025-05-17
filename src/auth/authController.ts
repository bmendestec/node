import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import { loginUser } from './authService.js';
import redis from '../infra/redis/index.js';
import { UserRepository } from '../domain/repositories/UserRepository.js';


export async function loginController(request: FastifyRequest, reply: FastifyReply, action: 'login' | 'logout' | 'validate-token', userRepository: UserRepository) {
    if (action === 'login') {
        const { email, password } = request.body as { email: string; password: string };
        
        const token = await loginUser(email, password, request, reply, userRepository);
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; email: string };
        await redis.set(`user:${decoded.id}:token`, token, 'EX', 3600);  
        
        const storedToken = await redis.get(`token`);
        if (storedToken !== token) {
            return reply.status(401).send({ message: 'Unauthorized' });
        } else {
            reply.headers({ 'Authorization': `Bearer ${storedToken}` });
            reply.send({ message: 'Login successful', storedToken });
        }

    } else if (action === 'logout') {
        const authHeader = request.headers['authorization'] as string;
        if (!authHeader) {
            return reply.status(401).send({ message: 'Authorization header is missing' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return reply.status(401).send({ message: 'Token is missing' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; email: string };
        await redis.del(`user:${decoded.id}:token`);
        reply.send({ message: 'Logged out successfully', decoded: `${decoded.id}` });

    } else if (action === 'validate-token') {
        const authHeader = request.headers['authorization'] as string;
        if (!authHeader) {
            return reply.status(401).send({ message: 'Authorization header is missing' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return reply.status(401).send({ message: 'Token is missing' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; email: string };
            const storedToken = await redis.get(`user:${decoded.id}:token`);
            if (storedToken !== token) {
                return reply.status(401).send({ message: 'Unauthorized' });
            } else {
                reply.send({ message: true, decoded });
            }
        } catch (error) {
            return reply.status(401).send({ message: false, error: 'Invalid token' });
        }
    }
}
