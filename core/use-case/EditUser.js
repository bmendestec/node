export class EditUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(id) {
        const users = await this.userRepository.edit(id);
        if (!users) {
            throw new Error('User not found');
        }
        return users;
    }
}