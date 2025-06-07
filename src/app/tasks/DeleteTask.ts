import { CreateTaskDependencies } from "../../domain/entities/Task";

export class DeleteTask {
    constructor(private taskRepository: CreateTaskDependencies['taskRepository']) {
        this.taskRepository = taskRepository;
    }

    async execute(id: number): Promise<void> {
        if (!id) {
            throw new Error('Invalid task data');
        }
        
        return this.taskRepository.delete(id);

    }
}