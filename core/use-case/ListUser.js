export class ListUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(search = '') {
        const users = await this.userRepository.list(search);
        return users;
    }
}