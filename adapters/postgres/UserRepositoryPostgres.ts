import { sql } from "../../infra/database/db.js";
import { UserRepository } from "../../ports/UserRepository.js";
import { User } from "../../core/entities/User.js";
import bcrypt from "bcrypt";

export class UserRepositoryPostgres implements UserRepository {

    async create(user: User): Promise<User> {
        try {
            const { name, birth_date, age, gender, email, password } = user;
            const hashedPassword = await bcrypt.hash(password, 10);

            await sql`
               insert into usuarios (name, birth_date, age, gender, email, password, created_by)
               values (${name}, ${birth_date}, ${age}, ${gender}, ${email}, ${hashedPassword}, ${user.name})
           `;

            console.log("User created successfully:", user);
            return user;

        } catch (error: any) {
            if (error.code === '23505') {
                console.error("Email already exists:", error.detail);
                throw new Error("Email already exists");
            } else {
                console.error("Error creating user:", error);
                throw new Error("Database error TESTE");
            }
        }
    }

    async list(search: string = ''): Promise<User[]> {
        const sanitizedSearch = `%${search}%`;

        return search
            ? sql<User[]>`SELECT * FROM usuarios WHERE name ILIKE ${sanitizedSearch} or email ILIKE ${sanitizedSearch} or gender ILIKE ${sanitizedSearch}`
            : sql<User[]>`SELECT * FROM usuarios where active = 'S' order by name`;
    }

    async edit(id: number, user: User): Promise<User> {
        const existingUser = await sql<User[]>`SELECT * FROM usuarios WHERE id = ${id}`;
        const { name, birth_date, age, gender, email } = user;
        if (!existingUser.length) {
            throw new Error("User not found");
        };
        await sql`
            update usuarios
            set name = ${name}, 
                birth_date = ${birth_date}, 
                age = ${age}, 
                gender = ${gender}, 
                email = ${email},
                updated_at = now(),
                updated_by = ${name}
            where id = ${id}
        `;

        return user;
    }

    async delete(id: number): Promise<void> {
        const existingUser = await sql<User[]>`SELECT * FROM usuarios WHERE id = ${id}`;

        if (!existingUser.length) {
            throw new Error("User not found");
        }
        await sql`
            delete from usuarios
            where id = ${id}
        `;
    }

    async findByEmail(email: string): Promise<User | null> {
        try {
            const existingUser = await sql<User[]>`SELECT * FROM usuarios WHERE email = ${email}`;
            if (!existingUser.length) {
                return null;
            }
            return existingUser[0];
        }
        catch (error) {
            console.error("Error finding user by email:", error);
            throw new Error("Database error");
        }
    }
    async findById(id: number): Promise<User | null> {
        try {
            const existingUser = await sql<User[]>`SELECT * FROM usuarios WHERE id = ${id}`;
            if (!existingUser.length) {
                return null;
            }
            return existingUser[0];
        }
        catch (error) {
            console.error("Error finding user by id:", error);
            throw new Error("Database error");
        }
    }
}