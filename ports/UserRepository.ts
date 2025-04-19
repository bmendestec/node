import { User } from "../types/User.js";

export abstract class UserRepository {
 /**
 * Cria um novo usuário.
 * @param user - Dados do usuário a ser criado.
 * @returns O usuário criado.
 */
    abstract create(user: User): Promise<User>;

/**
 * Lista os usuários, com opção de busca por nome, email ou sexo.
 * @param search - Termo de busca (opcional).
 * @returns Lista de usuários.
 */
    abstract list(search?: string): Promise<User[]>;

/**
 * Edita um usuário existente.
 * @param id - ID do usuário a ser editado.
 * @param user - Novos dados do usuário.
 * @returns Void.
 */
    abstract edit(id: number, user: User): Promise<User>;
    
/**
 * Deleta um usuário existente.
 * @param id - ID do usuário a ser deletado.
 * @returns Void.
 * @throws Error se o usuário não for encontrado.
 */
    abstract delete(id: number): Promise<void>;
}