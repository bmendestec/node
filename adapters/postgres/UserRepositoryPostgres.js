import { sql } from "../../utils/db.js";
import { UserRepository } from "../../ports/UserRepository.js";
import bcrypt from "bcrypt";

export class UserRepositoryPostgres extends UserRepository {
    async create(user) {
        const { nome, data_nascimento, idade, sexo, email, senha } = user;
        const hashedPassword = await bcrypt.hash(senha, 10);

        await sql`
            insert into usuarios (nome, data_nascimento, idade, sexo, email, senha)
            values (${nome}, ${data_nascimento}, ${idade}, ${sexo}, ${email}, ${hashedPassword})
        `;
        return user;
    }

    async list(search = '') {
        
        return search
        ? sql `SELECT * FROM usuarios WHERE nome ILIKE ${`%${search}%`}`
        : sql `SELECT * FROM usuarios`;
    }

    async edit(id, user) {
        const { nome, data_nascimento, idade, sexo, email, senha } = user;

        await sql`
            update usuarios
            set nome = ${nome}, 
                data_nascimento = ${data_nascimento}, 
                idade = ${idade}, 
                sexo = ${sexo}, 
                email = ${email}, 
                senha = ${senha}
            where id = ${id}
        `;
    }
    
    async delete(id) {
        await sql`
            delete from usuarios
            where id = ${id}
        `;
    }
}