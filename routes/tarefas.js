export default async function tarefasRoutes(server, database) {
    server.post('/tarefas', async (request, reply) => {
        const { titulo, descricao, status, usuarioId } = request.body;

        await database.create({
            titulo,
            descricao,
            status,
            usuarioId,
        });

        return reply.status(201).send();
    });

    server.get('/tarefas', async (request, reply) => {
        const search = request.query.search;
        const tarefas = await database.list(search);

        return tarefas;
    });

    server.put('/tarefas/:id', async (request, reply) => {
        const tarefaId = request.params.id;
        const { titulo, descricao, status, usuarioId } = request.body;

        await database.update(tarefaId, {
            titulo,
            descricao,
            status,
            usuarioId,
        });

        return reply.status(204).send();
    });

    server.delete('/tarefas/:id', async (request, reply) => {
        const tarefaId = request.params.id;

        await database.delete(tarefaId);

        return reply.status(204).send();
    });
}