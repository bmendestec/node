import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
    const token = request.cookies?.authToken;

    if (!token) {
        console.log('Token ausente');
        return reply.status(401).send({ message: 'Unauthorized' });
    }

    try {        
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; email: string };
        request.user = decoded;        
    } catch (error) {
        console.error('Token inválido', error);
        return reply.status(401).send({ message: 'Unauthorized' });
    }
}