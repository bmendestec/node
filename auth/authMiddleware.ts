import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import redis  from '../infra/redis/index.js';

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
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
        }      

        request.user = decoded;        
    } catch (error) {
        console.error('Token inválido', error);
        return reply.status(401).send({ message: 'Unauthorized' });
    }
}