import { User, CreateUserDependencies } from '../../domain/entities/User.js';

export class CreateUser {   

    constructor(private userRepository: CreateUserDependencies['userRepository']) {
        this.userRepository = userRepository;
    }

    async execute(userData: User): Promise<User> {

        if (!userData.name || !userData.email || !userData.password ) {
            throw new Error('Invalid user data');
        }
        
        const user = await this.userRepository.create(userData);        
        return user;
    }
}