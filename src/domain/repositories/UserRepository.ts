import { User } from "../entities/User.js";

export interface UserRepository {
    /**
    * Cria um novo usuário.
    * @param user - Dados do usuário a ser criado.
    * @returns O usuário criado.
    * */
    create(user: User): Promise<User>;

    /**
     * Lista os usuários, com opção de busca por nome ou email.
     * @param search - Termo de busca (opcional).
     * @returns Lista de usuários.
     * */
    list(search?: string): Promise<User[]>;

    /**
     * Edita um usuário existente.
     * @param id - ID do usuário a ser editado.
     * @param user - Novos dados do usuário.
     * @returns Void.
     * */
    edit(id: number, user: User): Promise<User>;

    /**
     * Deleta um usuário existente.
     * @param id - ID do usuário a ser deletado.
     * @returns Void.
     * @throws Error se o usuário não for encontrado.
     * */
    delete(id: number): Promise<void>;

    /**
     * Encontra um usuário pelo email.
     * @param email - Email do usuário a ser encontrado.
     * @returns O usuário encontrado ou null se não existir.
     * */
    findByEmail(email: string): Promise<User | null>;

    /**
     * Encontra um usuário pelo email.
     * @param email - Email do usuário a ser encontrado.
     * @returns O usuário encontrado ou null se não existir.
     * */
    findById(id: number): Promise<User | null>;
}