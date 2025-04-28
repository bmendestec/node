import type { UserRepository } from "../../ports/UserRepository.js";

export interface User {
    id?: number;
    nome: string;
    data_nascimento: Date;
    idade: number;
    sexo: string;
    email: string;
    senha: string;
}

export interface CreateUserDependencies {
    userRepository: UserRepository;
}