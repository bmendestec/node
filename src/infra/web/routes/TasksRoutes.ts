import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest, RequestGenericInterface } from 'fastify';
import { CreateTask } from '../../../app/tasks/CreateTask.js';
import { EditTask } from '../../../app/tasks/EditTask.js';
import { TaskRepository } from '../../../domain/repositories/TaskRepository.js';
import { Task } from '../../../domain/entities/Task.js';
import { authMiddleware } from '../../../auth/authMiddleware.js';
import { FindTaskById } from '../../../app/tasks/FindTaskById.js';
import { DeleteTask } from '../../../app/tasks/DeleteTask.js';
import { ListTask } from '../../../app/tasks/ListTask.js';

interface TasksRoutesOptions extends FastifyPluginOptions {
    taskRepository: TaskRepository;
}
interface getTasksQuery extends RequestGenericInterface {
    Querystring: {
        search?: string;
    },
    Params: { id: number },
    Body: Task,
}

export default async function tasksRoutes(server: FastifyInstance, options: TasksRoutesOptions): Promise<void> {
    const { taskRepository } = options;
    
    server.post<getTasksQuery>('/tasks', { preHandler: authMiddleware }, async (request: FastifyRequest<{ Body: Task }>, reply: FastifyReply) => {
        const createTask = new CreateTask(taskRepository);
        const tasks = await createTask.execute(request.body);
        
        return reply.status(201).send(tasks);
    })

    server.get<getTasksQuery>('/tasks', { preHandler: authMiddleware }, async (request, reply: FastifyReply) => {
        const listTask = new ListTask(taskRepository);
        const tasks = await listTask.execute(request.query.search || '');

        return reply.status(200).send(tasks);
    })

    server.get<getTasksQuery>('/tasks/:id', { preHandler: authMiddleware }, async (request, reply: FastifyReply) => {
        const findTaskById = new FindTaskById(taskRepository);
        const tasks = await findTaskById.execute(request.params.id);

        return reply.status(200).send(tasks);
    })

    server.put<getTasksQuery>('/tasks/:id', { preHandler: authMiddleware }, async (request, reply: FastifyReply) => {
        const editTask = new EditTask(taskRepository);
        const tasks = await editTask.execute(request.params.id, request.body);

        return reply.status(200).send(tasks);
    })

    server.delete<getTasksQuery>('/tasks/:id', { preHandler: authMiddleware }, async (request, reply: FastifyReply) => {
        const deleteTask = new DeleteTask(taskRepository);
        const tasks = await deleteTask.execute(request.params.id);

        return reply.status(204).send(tasks);
    })
}