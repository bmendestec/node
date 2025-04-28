import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import { UserRepositoryPostgres } from '../adapters/postgres/UserRepositoryPostgres.js';
import redis from '../infra/redis/index.js';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function loginUser(email: string, password: string, request: FastifyRequest, reply: FastifyReply): Promise<string> {

    const userRepository = new UserRepositoryPostgres();
    const user = await userRepository.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.senha))) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
        expiresIn: '1h',
    });
    
    await redis.set(`user:${user.id}:token`, token, 'EX', 3600);

    return reply.send({ token, user });
}
