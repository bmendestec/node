import { randomUUID } from "crypto"
import { sql } from "./db.js"

export class DatabasePostgres {
    #usuarios = new Map()

    async list(search = '') {
        let usuarios

        if (search) {
            usuarios = await sql`
                select *
                from usuarios
                where nome ilike ${`%${search}%`}`
        }else {
            usuarios = await sql`
                select *
                from usuarios`
        }

        return usuarios
    }

    async create(usuario) {
        const { nome, data_nascimento, idade, sexo, email, senha } = usuario;

        await sql`
            insert into usuarios (nome, data_nascimento, idade, sexo, email, senha)
            values (${nome}, ${data_nascimento}, ${idade}, ${sexo}, ${email}, ${senha})
        `;
    }

    async update(id, usuario) {
        const { nome, data_nascimento, idade, sexo, email, senha } = usuario;

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