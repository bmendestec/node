export class User {
    constructor({ id, nome, data_nascimento, idade, sexo, email, senha }) {
        this.id = id;
        this.nome = nome;
        this.data_nascimento = data_nascimento;
        this.idade = idade;
        this.sexo = sexo;
        this.email = email;
        this.senha = senha;
    }
}