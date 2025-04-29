import { User, CreateUserDependencies } from '../entities/User.js';

export class EditUser {
    constructor(private userRepository: CreateUserDependencies['userRepository']) {
        this.userRepository = userRepository;
    }

    async execute(id: number, user: User): Promise<User> {
        if (!id) {
            throw new Error('Invalid user ID');
        }

        const iUserExists = await this.userRepository.edit(id, user);
        if (!iUserExists) {
            throw new Error('User not found');
        }
        return user;
    }
}