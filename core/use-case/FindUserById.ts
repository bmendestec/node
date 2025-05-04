import { CreateUserDependencies, User } from "../entities/User";

export class FindUserById {
    constructor(private userRepository: CreateUserDependencies['userRepository']) {
        this.userRepository = userRepository;
    }

    async execute(id: number): Promise<User> {
        if (!id) {
            throw new Error('Invalid user ID');
        }

        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}