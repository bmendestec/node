import { User, CreateUserDependencies } from '../entities/User.js';

export class CreateUser {   

    constructor(private userRepository: CreateUserDependencies['userRepository']) {
        this.userRepository = userRepository;
    }

    async execute(userData: User): Promise<User> {

        if (!userData.nome || !userData.data_nascimento || !userData.idade || !userData.email || !userData.senha || !userData.active || !userData.created_at || !userData.updated_at || !userData.created_by || !userData.updated_by) {
            throw new Error('Invalid user data');
        }
        
        const user = await this.userRepository.create(userData);        
        return user;
    }
}