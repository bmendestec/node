import { FastifyRequest, FastifyInstance, FastifyReply } from 'fastify';
import { UserRepository } from '../repositories/UserRepository.js';

declare module 'fastify' {
    interface FastifyRequest {
        user?: {
            id: number;
            email: string;
        },
        userRepository?: UserRepository;
    }

    interface FastifyInstance {
        authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    }
}