import type { TaskRepository } from "../../ports/TaskRepository.js";

export interface Task {
    id?: number;
    project_id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    due_date: Date;
    completed_at: Date;
    active: string;
    created_at: Date;
    updated_at: Date;
}

export interface CreateTaskDependencies {
    taskRepository: TaskRepository;
}