import { CreateTaskDependencies, Task } from "../../domain/entities/Task";

export class CreateTask {
    constructor(private taskRepository: CreateTaskDependencies['taskRepository']) {
        this.taskRepository = taskRepository;
    }

    async execute(taskData: Task): Promise<Task> {
        if (!taskData.title || !taskData.description ) {
            console.log(taskData);
            throw new Error('Invalid task data');
        }
        
        const task = await this.taskRepository.create(taskData);        
        return task;

    }
}