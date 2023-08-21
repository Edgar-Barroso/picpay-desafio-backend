import User from "../entity/User";

export default interface UserRepository{
    findById(id: string):Promise<User | undefined>;
    findByCpf(cpf: string):Promise<User | undefined>;
    findByEmail(email: string):Promise<User | undefined>;
    create(user:User):Promise<User>
}