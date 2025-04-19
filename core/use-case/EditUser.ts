import { User, CreateUserDependencies } from '../../types/User.js';

export class EditUser {
    private userRepository: CreateUserDependencies['userRepository'];

    constructor({ userRepository }: CreateUserDependencies) {
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