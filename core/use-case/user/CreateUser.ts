import { User, CreateUserDependencies } from '../../entities/User.js';

export class CreateUser {   

    constructor(private userRepository: CreateUserDependencies['userRepository']) {
        this.userRepository = userRepository;
    }

    async execute(userData: User): Promise<User> {

        if (!userData.name || !userData.email || !userData.password || !userData.active || !userData.created_at || !userData.created_by ) {
            throw new Error('Invalid user data');
        }
        
        const user = await this.userRepository.create(userData);        
        return user;
    }
}