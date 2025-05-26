import fastify from "fastify";
import { TaskRepository } from "../../domain/repositories/TaskRepository";
import TaskRepositoryInMemory from "./repository/TasRepositoryInMemory";
import { Task } from "../../domain/entities/Task";
import tasksRoutes from "../../infra/web/routes/TasksRoutes";
import redis from "../../infra/redis";
import { throwDeprecation } from "process";

const app = fastify();
jest.mock("../../infra/redis", () => ({
    set: jest.fn().mockResolvedValue('OK'),
    get: jest.fn().mockResolvedValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImlhdCI6MTc0ODE5MzE1NSwiZXhwIjoxNzQ4MTk2NzU1fQ.IbLFvJRZsec9nM-uJ4Z4P7lbwy5Op0hYrVRHAq01afw'),
    quit: jest.fn().mockResolvedValue('OK'),
}));

const taskRepositoryMock: TaskRepository = new TaskRepositoryInMemory();
const task: Task = ({
    id: 9,
    project_id: 2,
    title: "Teste",
    description: "Testeeee",
    status: "In progress",
    priority: "High",
    due_date: new Date("2025-05-25T00:00:00.000Z"),
    completed_at: new Date("2025-05-25T00:00:00.000Z"),
    active: "A",
    created_at: new Date("2025-05-25T00:00:00.000Z"),
    updated_at: new Date("2025-05-25T00:00:00.000Z"),
});

describe("TasksRoutes API test", () => {
    beforeAll(async () => {
        process.env.JWT_SECRET = "mysecretkey";
        await app.register(tasksRoutes, { taskRepository: taskRepositoryMock })
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
        await redis.quit();
    });

    describe("GET /tasks", () => {
        it("should list all tasks", async () => {
            const response = await taskRepositoryMock.list();
            console.log('Logggg: ', response);
            expect(response).toEqual(
                expect.objectContaining(task),
                // expect.arrayContaining([
                // ])
            );
        });

        it("should find a task by id", async () => {
            const response = await taskRepositoryMock.findById(9);
            if (!response) {
                throw new Error("No task found!");
            }

            expect(response).toEqual(
                expect.objectContaining(task)
            )
        });

        it("should don't find a task by id", async () => {
            const response = await taskRepositoryMock.findById(91);
            if (response) {
                throw new Error(`Found task ${response}`);
            }

            expect(response).toBeNull();
        });

        it("should delete a task", async () => {
            const response = await taskRepositoryMock.delete(9);
            expect(response).toBeUndefined();
        });

        it("should edit a task", async () => {
            const response = await taskRepositoryMock.edit(9, {
                id: 9,
                project_id: 2,
                title: "Alterado",
                description: "Testeeee",
                status: "In progress",
                priority: "High",
                due_date: new Date("2025-05-25T00:00:00.000Z"),
                completed_at: new Date("2025-05-25T00:00:00.000Z"),
                active: "A",
                created_at: new Date("2025-05-25T00:00:00.000Z"),
                updated_at: new Date("2025-05-25T00:00:00.000Z"),
            });
            expect(response).toEqual(
                expect.objectContaining({
                    id: 9,
                    project_id: 2,
                    title: "Alterado",
                    description: "Testeeee",
                    status: "In progress",
                    priority: "High",
                    due_date: new Date("2025-05-25T00:00:00.000Z"),
                    completed_at: new Date("2025-05-25T00:00:00.000Z"),
                    active: "A",
                    created_at: new Date("2025-05-25T00:00:00.000Z"),
                    updated_at: new Date("2025-05-25T00:00:00.000Z"),
                })
            );
        });

        it("should return null if task to edit does not exist", async () => {
            const response = await taskRepositoryMock.edit(99, {
                project_id: 2,
                title: "Alterado",
                description: "Testeeee",
                status: "In progress",
                priority: "High",
                due_date: new Date("2025-05-25T00:00:00.000Z"),
                completed_at: new Date("2025-05-25T00:00:00.000Z"),
                active: "A",
                created_at: new Date("2025-05-25T00:00:00.000Z"),
                updated_at: new Date("2025-05-25T00:00:00.000Z"),
            });
            expect(response).toBeNull();
        });
    });
});