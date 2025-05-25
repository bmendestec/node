// import fastify from "fastify";
// import tasksRoutes from "../../infra/web/routes/TasksRoutes";
// import { TaskRepository } from "../../domain/repositories/TaskRepository";
// import supertest from "supertest";


// const mockTaskRepository: TaskRepository = {
//     create: jest.fn(),
//     list: jest.fn(),
//     edit: jest.fn(),
//     delete: jest.fn(),
//     findById: jest.fn(),
// }

// describe("TaskRepository", () => {
//     const app = fastify();

//     beforeAll(async () => {
//         await app.register(tasksRoutes, { taskRepository: mockTaskRepository });
//     });

//     afterAll(() => app.close());

//     it('should create a new task', async () => {
//         const taskData = { title: 'Test Task', description: 'Test Description' };
//         (mockTaskRepository.create as jest.Mock).mockResolvedValue(taskData);

//         const response = await supertest(app.server).post('/tasks').send(taskData).set('Authorization', 'Bearer fake-token');

//         expect(response.status).toBe(201);
//         expect(response.body).toEqual(taskData);
//         expect(mockTaskRepository.create).toHaveBeenCalledWith(taskData);
//     });

//     it('should list tasks', async () => {
//         const taskList = [{ id: 1, title: 'Test Task', description: 'Test Description' }];
//         (mockTaskRepository.list as jest.Mock).mockResolvedValue(taskList);

//         const response = await supertest(app.server).get('/tasks').set('Authorization', 'Bearer fake-token');

//         expect(response.status).toBe(200);
//         expect(response.body).toEqual(taskList);
//         expect(mockTaskRepository.list).toHaveBeenCalledWith('');
//     });    
// });