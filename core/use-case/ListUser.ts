import { User, CreateUserDependencies } from '../../types/User.js';

export class ListUser {
    constructor(private userRepository: CreateUserDependencies['userRepository']) {
        this.userRepository = userRepository;
    }

    async execute(search: string = ''): Promise<User[]> {
        const users = await this.userRepository.list(search);
        if (!users) {
            throw new Error('No users found');
        }
        return users;
    }
}