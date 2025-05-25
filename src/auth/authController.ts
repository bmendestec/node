import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import redis from '../infra/redis/index.js';
import { UserRepository } from '../domain/repositories/UserRepository.js';


export class AuthController {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async login(email: string, password: string): Promise<String | undefined> {
        try {
            const user = await this.userRepository.findByEmail(email);            
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return 'Invalid credential';
            }
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
                expiresIn: '1h',
            });

            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
            await redis.set(`user:${decoded.id}:token`, token, 'EX', 3600);
            return token;
        } catch (e) {
            console.log(e);
        }
    };

    async validateToken(token: string): Promise<object | undefined> {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
            const storedToken = await redis.get(`user:${decoded.id}:token`);            
            if (!storedToken && storedToken !== token) {
                console.log('false');
                return { message: false };
            }

            return { message: true }
        } catch (e) {
            console.log(e);
        }
    }

    async logout(token: string): Promise<void> {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
            console.log('User deleted: ', decoded.id);
            await redis.del(`user:${decoded.id}:token`);

        } catch (e) {
            console.log(e);
        }
    }
}
