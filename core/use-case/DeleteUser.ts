import { CreateUserDependencies } from '../../types/User.js';

export class DeleteUser {
    private userRepository: CreateUserDependencies['userRepository'];

    constructor({ userRepository }: CreateUserDependencies) {
        this.userRepository = userRepository;
    }

    async execute(id: number): Promise<void> {
        if (!id) {
            throw new Error('User ID is required');
        }
        
        await this.userRepository.delete(id);        
    }
}