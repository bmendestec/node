import { CreateTaskDependencies, Task } from "../../domain/entities/Task";

export class ListTask {
    constructor(private taskRepository: CreateTaskDependencies['taskRepository']) {
        this.taskRepository = taskRepository;
    }

    async execute(search: string = ''): Promise<Task[]> {
        const tasks = await this.taskRepository.list(search);
        if (!tasks) {
            throw new Error('No tasks found');
        }
        return tasks;
    }
}