import { CreateUserDependencies } from '../../domain/entities/User.js';

export class DeleteUser {
    constructor(private userRepository: CreateUserDependencies['userRepository']) {
        this.userRepository = userRepository;
    }

    async execute(id: number): Promise<void> {
        if (!id) {
            throw new Error('User ID is required');
        }
        
        await this.userRepository.delete(id);        
    }
}