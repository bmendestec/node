
import { Task } from "../../../domain/entities/Task";
import { TaskRepository } from "../../../domain/repositories/TaskRepository";

export default class TaskRepositoryInMemory implements TaskRepository {
    private tasks: Task[] = [];

    async create(task: Task): Promise<Task> {
        await this.tasks.push({
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

        return task;
    };

    async delete(id: number): Promise<void> {
        await this.tasks.push({
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
        this.tasks.pop();
        this.tasks = this.tasks.filter(task => task.id === id);
    }

    async edit(id: number, task: Partial<Task>): Promise<Task | null> {
        await this.tasks.push({
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

        const index = this.tasks.findIndex(task => task.id === id);
        if (id !== task.id){
            return null;
        }        

        this.tasks[index] = { ...this.tasks[index], ...task };
        return this.tasks[index];
    }

    async findById(id: number): Promise<Task | null> {
        await this.tasks.push({
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

        const task = await this.tasks.find(task => task.id === id);
        if (!task) {
            return null;
        }

        return task;
    }

    async list(search?: string): Promise<Task[]> {
        this.tasks.push({
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

        if (!search) {
            throw this.tasks;
        }

        return this.tasks.filter(task => task.title === search || task.description === search || task.status === search);
    }
}