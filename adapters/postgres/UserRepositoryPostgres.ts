import { sql } from "../../infra/database/db.js";
import { UserRepository } from "../../ports/UserRepository.js";
import { User } from "../../core/entities/User.js";
import bcrypt from "bcrypt";

export class UserRepositoryPostgres implements UserRepository {

    async create(user: User): Promise<User> {
        const { nome, data_nascimento, idade, sexo, email, senha } = user;
        const hashedPassword = await bcrypt.hash(senha, 10);

        await sql`
            insert into usuarios (nome, data_nascimento, idade, sexo, email, senha)
            values (${nome}, ${data_nascimento}, ${idade}, ${sexo}, ${email}, ${hashedPassword})
        `;
        return user;
    }

    async list(search: string = ''): Promise<User[]> {
        const sanitizedSearch = `%${search}%`;
        
        return search
        ? sql<User[]>`SELECT * FROM usuarios WHERE nome ILIKE ${sanitizedSearch} or email ILIKE ${sanitizedSearch} or sexo ILIKE ${sanitizedSearch}`
        : sql<User[]>`SELECT * FROM usuarios order by nome`;
    }

    async edit(id: number, user: User): Promise<User> {
        const existingUser = await sql<User[]>`SELECT * FROM usuarios WHERE id = ${id}`;
        const { nome, data_nascimento, idade, sexo, email } = user;
        if (!existingUser.length) {
            throw new Error("User not found");
        };
        await sql`
            update usuarios
            set nome = ${nome}, 
                data_nascimento = ${data_nascimento}, 
                idade = ${idade}, 
                sexo = ${sexo}, 
                email = ${email}
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