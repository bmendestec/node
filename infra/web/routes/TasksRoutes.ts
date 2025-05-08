import { FastifyInstance, FastifyReply, FastifyRequest, RequestGenericInterface } from 'fastify';
import { CreateTask } from '../../../core/use-case/tasks/CreateTask.js';
import { EditTask } from '../../../core/use-case/tasks/EditTask.js';
import { TaskRepository } from '../../../ports/TaskRepository.js';
import { Task } from '../../../core/entities/Task.js';
import { authMiddleware } from '../../../auth/authMiddleware.js';
import { FindTaskById } from '../../../core/use-case/tasks/FindTaskById.js';
import { DeleteTask } from '../../../core/use-case/tasks/DeleteTask.js';
import { ListTask } from '../../../core/use-case/tasks/ListTask.js';

interface getTasksQuery extends RequestGenericInterface {
    Querystring: {
        search?: string;
    },
    Params: { id: number },
    Body: Task,
}

export default async function tasksRoutes(server: FastifyInstance, taskRepository: TaskRepository): Promise<void> {
    server.post<getTasksQuery>('/tasks', { preHandler: authMiddleware }, async (request: FastifyRequest<{ Body: Task }>, reply: FastifyReply) => {
        const createTask = new CreateTask(taskRepository);
        const tasks = await createTask.execute(request.body);
        console.log('Reply:', reply);
        return reply.status(201).send(tasks);
    })

    server.get<getTasksQuery>('/tasks', { preHandler: authMiddleware }, async (request, reply: FastifyReply) => {
        const listTask = new ListTask(taskRepository);
        const tasks = await listTask.execute(request.query.search || '');
        console.log('Reply:', reply);
        return reply.status(200).send(tasks);
    })

    server.get<getTasksQuery>('/tasks/:id', { preHandler: authMiddleware }, async (request, reply: FastifyReply) => {
        const findTaskById = new FindTaskById(taskRepository);
        const tasks = await findTaskById.execute(request.params.id);
        console.log('Reply:', reply);
        console.log('Task created:', tasks);
        return reply.status(200).send(tasks);
    })

    server.put<getTasksQuery>('/tasks/:id', { preHandler: authMiddleware }, async (request, reply: FastifyReply) => {
        const editTask = new EditTask(taskRepository);
        const tasks = await editTask.execute(request.params.id, request.body);
        console.log('Reply:', reply);
        console.log('Task created:', tasks);
        return reply.status(200).send(tasks);
    })

    server.delete<getTasksQuery>('/tasks/:id', { preHandler: authMiddleware }, async (request, reply: FastifyReply) => {
        const deleteTask = new DeleteTask(taskRepository);
        const tasks = await deleteTask.execute(request.params.id);
        console.log('Reply:', reply);
        console.log('Task created:', tasks);
        return reply.status(204).send(tasks);
    })
}