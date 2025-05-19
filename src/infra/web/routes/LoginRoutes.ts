import { FastifyInstance, FastifyReply, FastifyRequest,FastifyPluginOptions } from 'fastify';
import { loginController } from '../../../auth/authController.js';
import { UserRepository } from '../../../domain/repositories/UserRepository.js';
import jwt from 'jsonwebtoken';

interface LoginRoutesOptions extends FastifyPluginOptions {
    userRepository: UserRepository;
}

export default async function loginRoutes(server: FastifyInstance,  options: LoginRoutesOptions): Promise<void> {
    const { userRepository } = options;
    
    server.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { email, password } = request.body as { email: string; password: string };
            const user = await userRepository.findByEmail(email);
    
            if (!user || password !== user.password) {
                return reply.status(401).send({ message: "Invalid credentials" });
            }
    
            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET!);
            return reply.status(200).send({ token });
        } catch (error) {
            console.error(error);
            return reply.status(500).send({ message: "Internal Server Error" });
        }
        // return loginController(request, reply, 'login', userRepository)
    });
    server.get('/logout', async (request: FastifyRequest, reply: FastifyReply) => {
        return loginController(request, reply, 'logout', userRepository)
    });

    server.get('/validate-token', async (request: FastifyRequest, reply: FastifyReply) => {
        return loginController(request, reply, 'validate-token', userRepository)
    });
}