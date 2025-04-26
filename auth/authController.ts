import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import { loginUser } from './authService.js';
import redis from '../infra/redis/index.js';


export async function loginController(request: FastifyRequest, reply: FastifyReply) {
    const { email, senha } = request.body as { email: string; senha: string };
    
    const token = await loginUser(email, senha, request, reply);
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; email: string };
    await redis.set(`user:${decoded.id}:token`, token, 'EX', 3600);  
    
    const storedToken = await redis.get(`user:${decoded.id}:token`);
    if (storedToken !== token) {
        return reply.status(401).send({ message: 'Unauthorized' });
    } else {
        reply.headers({ 'Authorization': `Bearer ${storedToken}` });
        reply.send({ message: 'Login successful', storedToken });
    }

}