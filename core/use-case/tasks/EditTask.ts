import { CreateTaskDependencies, Task } from "../../entities/Task";

export class EditTask {
    constructor(private taskRepository: CreateTaskDependencies['taskRepository']) {
        this.taskRepository = taskRepository;
    }

    async execute(id: number, taskData: Task): Promise<Task> {
        const editedTask = await this.taskRepository.edit(id, taskData);
        if (!editedTask) {
            throw new Error('Failed to edit task');
        }
        return editedTask;
    }
}