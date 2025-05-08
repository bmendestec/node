import { sql } from "../../infra/database/db.js";
import { TaskRepository } from "../../ports/TaskRepository.js"
import { Task } from "../../core/entities/Task.js";

export class TaskRepositoryPostgres implements TaskRepository {

    async create(task: Task): Promise<Task> {
        try {
            const { title, project_id, description, due_date, completed_at, priority, status , created_at, updated_at} = task;

            await sql`
               insert into tasks (title, project_id, description, status, priority, due_date, completed_at, created_at, updated_at)
               values (${title}, ${project_id}, ${description}, ${status}, ${priority}, ${due_date}, ${completed_at}, ${created_at}, ${updated_at})
           `;

            console.log("Task created successfully:", task);
            return task;

        } catch (error: any) {
            console.error("Error creating user:", error);
            throw new Error("Database error in Creat method in TaskRepositoryPostgres");
        }
    }

    async list(search: string = ''): Promise<Task[]> {
        const sanitizedSearch = `%${search}%`;

        return search
            ? sql<Task[]>`SELECT * FROM tasks WHERE title ILIKE ${sanitizedSearch} or description ILIKE ${sanitizedSearch} or status ILIKE ${sanitizedSearch}`
            : sql<Task[]>`SELECT * FROM tasks order by created_at desc`;
    }

    async edit(id: number, task: Task): Promise<Task> {
        const existingTask = await sql<Task[]>`SELECT * FROM tasks WHERE id = ${id}`;
        const { title, description, due_date, completed_at, priority, status } = task;
        if (!existingTask.length) {
            throw new Error("Task not found");
        };

        await sql`
            update tasks
            set title = ${title}, 
                description = ${description}, 
                due_date = ${due_date}, 
                completed_at = ${completed_at}, 
                priority = ${priority},
                updated_at = now(),
                status = ${status}
            where id = ${id}
        `;

        return task;
    }

    async delete(id: number): Promise<void> {
        const existingTask = await sql<Task[]>`SELECT * FROM tasks WHERE id = ${id}`;

        if (!existingTask.length) {
            throw new Error("Task not found");
        }
        await sql`
            delete from tasks
            where id = ${id}
        `;
    }

    async findById(id: number): Promise<Task | null> {
        try {
            const existingTask = await sql<Task[]>`SELECT * FROM tasks WHERE id = ${id}`;
            if (!existingTask.length) {
                return null;
            }
            return existingTask[0];
        }
        catch (error) {
            console.error("Error finding task by id:", error);
            throw new Error("Database error");
        }
    }
}