import User from "@/domain/entity/User";
import UserRepository from "@/domain/repository/UserRepository";

export default class InMemoryUserRepository implements UserRepository{
    items:User[]
    constructor(){
        this.items = []
    }

    async findById(id: string): Promise<User | undefined> {
        return this.items.find(item=>item.getId()===id)
    }
    async findByCpf(cpf: string): Promise<User | undefined> {
        return this.items.find(item=>item.getCpf()===cpf)

    }
    async findByEmail(email: string): Promise<User | undefined> {
        return this.items.find(item=>item.getEmail()===email)

    }
    async create(user: User):Promise<User>{
        this.items.push(user)
        return user
    }
}