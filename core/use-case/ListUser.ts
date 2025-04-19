import { User, CreateUserDependencies } from '../../types/User.js';

export class ListUser {
    private userRepository: CreateUserDependencies['userRepository'];

    constructor({ userRepository }: CreateUserDependencies) {
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