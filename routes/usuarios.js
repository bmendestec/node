import bcrypt from 'bcrypt';

export default async function userRoutes(server, database) {
    server.post('/usuarios', async (request, reply) => {
        const { nome, data_nascimento, idade, sexo, email, senha } = request.body
        const hashedPassword = await bcrypt.hash(senha, 10);

        await database.create({
            nome,
            data_nascimento,
            idade,
            sexo,
            email,
            senha: hashedPassword
        })

        return reply.status(201).send()
    })

    server.get('/usuarios', async (request, reply) => {
        const search = request.query.search
        console.log(search)
        const usuarios = await database.list(search)

        return usuarios;
    })

    server.put('/usuarios/:id', async (request, reply) => {
        const usuarioId = request.params.id;
        const { nome, data_nascimento, idade, sexo, email, senha } = request.body;

        await database.update(usuarioId, {
            nome,
            data_nascimento,
            idade,
            sexo,
            email,
            senha,
        });

        return reply.status(204).send();
    })

    server.delete('/usuarios/:id', async (request, reply) => {
        const usuarioId = request.params.id;

        await database.delete(usuarioId);

        return reply.status(204).send();
    });
}