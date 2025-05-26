import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../../domain/repositories/UserRepository";

export default class UserRepositoryInMemory implements UserRepository {

    private users: User[] = [];


    async findByEmail(email: string): Promise<User | null> {
        this.users.push({
            id: 34,
            name: "Bruno",
            email: "bruno@gmail.com",
            age: 28,
            birth_date: new Date('1997-02-28'),
            gender: "Male",
            password: "123"
        });
        const user = this.users.find(user => user.email === email);
        if (!user) {
            return null;
        }
        return user;
    }

    async create(user: User): Promise<User> {
        this.users.push({
            id: 34,
            name: "Bruno",
            email: "bruno@gmail.com",
            age: 28,
            birth_date: new Date('1997-02-28'),
            gender: "Male",
            password: "123"
        });
        return user;
    }

    async list(search?: string): Promise<User[]> {
        this.users.push({
            id: 34,
            name: "Bruno",
            email: "bruno@gmail.com",
            age: 28,
            birth_date: new Date('1997-02-28'),
            gender: "Male",
            password: "123"
        });

        if (!search) {
            return this.users;
        }
        return this.users.filter(user => user.email === search || user.name === search);
    }

    async delete(id: number): Promise<void> {
        this.users.push({
            id: 34,
            name: "Bruno",
            email: "bruno@gmail.com",
            age: 28,
            birth_date: new Date('1997-02-28'),
            gender: "Male",
            password: "123"
        });
        this.users.pop();
        this.users = this.users.filter(user => user.id === id);
    }

    async edit(id: number, updatedUser: Partial<User>): Promise<User> {
        this.users.push({
            id: 34,
            name: "Bruno",
            email: "bruno@gmail.com",
            age: 28,
            birth_date: new Date('1997-02-28'),
            gender: "Male",
            password: "123"
        });

        const index = this.users.findIndex(user => user.id === id);

        if (index === -1) {
            throw new Error(`User ${id} not found`);
        }

        this.users[index] = { ...this.users[index], ...updatedUser };
        return this.users[index];
    }

    async findById(id: number): Promise<User | null> {
        this.users.push({
            id: 34,
            name: "Bruno",
            email: "bruno@gmail.com",
            age: 28,
            birth_date: new Date('1997-02-28'),
            gender: "Male",
            password: "123"
        });

        const user = this.users.find(user => user.id === id);
        if (!user) {
            return null;
        }

        return user;
    }
}