import { Task } from "../entities/Task.js";

export interface TaskRepository {
    /**
    * Create a new task.
    * @param task - Task's data to be created.
    * @returns The task created.
    * */
    create(task: Task): Promise<Task>;

    /**
     * List of tasks, optionally filtered by title or description.
     * @param search - Search term (optionally).
     * @returns Task's list.
     * */
    list(search?: string): Promise<Task[]>;

    /**
     * Edit an existing task.
     * @param id - ID of the task to be edited.
     * @param task - New task's data.
     * @returns Void.
     * */
    edit(id: number, task: Task): Promise<Task>;

    /**
     * Delete an existing task.
     * @param id - ID of the task to be deleted.
     * @returns Void.
     * @throws Error if a task with the given ID does not exist.
     * */
    delete(id: number): Promise<void>;

    /**
     * Find a task by its ID.
     * * @param id - ID of the task to be found.
     * @returns The task found or null if it does not exist.
     * */
    findById(id: number): Promise<Task | null>;
}