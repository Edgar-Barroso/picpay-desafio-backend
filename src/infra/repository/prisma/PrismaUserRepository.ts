import User from "@/domain/entity/User";
import UserRepository from "@/domain/repository/UserRepository";
import prisma from "./Prisma";
import Password from "@/domain/valueObject/Password";
import CommonClient from "@/domain/entity/CommonClient";
import Storekeeper from "@/domain/entity/Storekeeper";
import Prisma from "./Prisma";

export default class PrismaUserRepository implements UserRepository{
    private assembleUser(userData:any):User{
        const {id,name,cpf,email,balance,createdAt,passwordHash,type} = userData
        if(type=="COMMON_CLIENT"){
            return new CommonClient(name,cpf,email,Password.decode(passwordHash),balance,createdAt,id)
        }
        return new Storekeeper(name,cpf,email,Password.decode(passwordHash),balance,createdAt,id)
    }

    async findById(id: string): Promise<User | undefined> {
        const userData = await prisma.user.findUnique({where:{id}})
        if (!userData) return undefined
        return this.assembleUser(userData)
        

    }
    async findByCpf(cpf: string): Promise<User | undefined> {
        const userData = await prisma.user.findUnique({where:{cpf}})
        if (!userData) return undefined
        return this.assembleUser(userData)

    }
    async findByEmail(email: string): Promise<User | undefined> {
        const userData = await prisma.user.findUnique({where:{email}})
        if (!userData) return undefined
        return this.assembleUser(userData)
        
    }
    async create(user: User): Promise<User> {
        await prisma.user.create({data:{
            name:user.getName(),
            cpf:user.getCpf(),
            email:user.getEmail(),
            createdAt:user.getCreatedAt(),
            passwordHash:Password.code(user.getPassword()),
            balance:user.getBalance(),
            id:user.getId(),
            type:user instanceof CommonClient ? "COMMON_CLIENT" : "STOREKEEPER"
        }})
        return user
    }

}