import type { UserRepository } from "../../domain/repositories/UserRepository.js";

export interface User {
    id?: number;
    name: string;
    birth_date: Date;
    age: number;
    gender: string;
    email: string;
    password: string;
    active?: string;
    created_at?: Date;
    updated_at?: Date;
    created_by?: string;
    updated_by?: string;
}

export interface CreateUserDependencies {
    userRepository: UserRepository;
}