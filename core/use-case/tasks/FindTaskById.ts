import { CreateTaskDependencies, Task } from "../../entities/Task";

export class FindTaskById {
    constructor(private taskRepository: CreateTaskDependencies['taskRepository']) {
        this.taskRepository = taskRepository;
    }

    async execute(id: number): Promise<Task> {
        if (!id) {
            throw new Error('Invalid task ID');
        }

        const task = await this.taskRepository.findById(id);
        if (!task) {
            throw new Error('Task not found');
        }
        return task;
    }
}