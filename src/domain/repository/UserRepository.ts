import Storekeeper from "../entity/Storekeeper";
import User from "../entity/User";

export default interface UserRepository{
    create(user: User): Promise<User>;
    findById(id: string):Promise<User | undefined>;
    findByCpf(cpf: string):Promise<User | undefined>;
    findByEmail(email: string):Promise<User | undefined>;
}