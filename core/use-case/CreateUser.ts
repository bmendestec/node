import { User, CreateUserDependencies } from '../../types/User.js';

export class CreateUser {
    private userRepository: CreateUserDependencies['userRepository'];

    constructor({ userRepository }: CreateUserDependencies) {
        this.userRepository = userRepository;
    }

    async execute(userData: User): Promise<User> {

        if (!userData.nome || !userData.data_nascimento || !userData.idade || !userData.sexo || !userData.email || !userData.senha) {
            throw new Error('Invalid user data');
        }
        
        const existingUser = await this.userRepository.list(userData.nome);
        if (existingUser) {
            throw new Error('User already exists');
        }
        
        const user = await this.userRepository.create(userData);
        return user;
    }
}