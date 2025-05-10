import type { UserRepository } from "../../ports/UserRepository.js";

export interface User {
    id?: number;
    nome: string;
    data_nascimento: Date;
    idade: number;
    sexo: string;
    email: string;
    senha: string;
    active?: string;
    created_at?: Date;
    updated_at?: Date;
    created_by?: string;
    updated_by?: string;
}

export interface CreateUserDependencies {
    userRepository: UserRepository;
}