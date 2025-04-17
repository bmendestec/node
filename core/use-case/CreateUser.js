export class CreateUser {
    constructor({ userRepository }) {
        this.userRepository = userRepository;
    }

    async execute(userData) {
        const user = await this.userRepository.create(userData);
        return user;
    }
}