import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import { UserRepositoryPostgres } from '../adapters/postgres/UserRepositoryPostgres.js';

export async function loginUser(
    email: string, 
    senha: string
): Promise<string> {

    const userRepository = new UserRepositoryPostgres();
    const user = await userRepository.findByEmail(email);

    if (!user || !(await bcrypt.compare(senha, user.senha))) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
        expiresIn: '7d',
    });

    return token;
}