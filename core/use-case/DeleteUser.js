export class DeleteUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(id) {
        const users = await this.userRepository.delete(id);
        if (!users) {
            throw new Error('User not found');
        }
        return users;
    }
}