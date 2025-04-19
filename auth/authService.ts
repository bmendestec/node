import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { CreateUserDependencies } from '../types/User.js';

export async function loginUser(
    email: string, 
    password: string, 
    userRepository: CreateUserDependencies['userRepository']
): Promise<string> {

    const user = await userRepository.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.senha))) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
        expiresIn: '1h',
    });

    return token;
}