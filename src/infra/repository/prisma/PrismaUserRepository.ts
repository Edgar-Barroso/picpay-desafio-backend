import User from "@/domain/entity/User";
import UserRepository from "@/domain/repository/UserRepository";
import prisma from "./Prisma";
import Password from "@/domain/valueObject/Password";

export default class PrismaUserRepository implements UserRepository{
    async findById(id: string): Promise<User | undefined> {
        const userData = await prisma.user.findUnique({where:{id}})
        if (!userData) return undefined
        const {name,cpf,email,balance,createdAt,passwordHash} = userData
        const user = new User(name,cpf,email,Password.decode(passwordHash),balance,createdAt,id)
        return user
    }
    async findByCpf(cpf: string): Promise<User | undefined> {
        const userData = await prisma.user.findUnique({where:{cpf}})
        if (!userData) return undefined
        const {name,id,email,balance,createdAt,passwordHash} = userData
        const user = new User(name,cpf,email,Password.decode(passwordHash),balance,createdAt,id)
        return user
    }
    async findByEmail(email: string): Promise<User | undefined> {
        const userData = await prisma.user.findUnique({where:{email}})
        if (!userData) return undefined
        const {name,cpf,id,balance,createdAt,passwordHash} = userData
        const user = new User(name,cpf,email,Password.decode(passwordHash),balance,createdAt,id)
        return user
    }
    async create(user: User): Promise<User> {
        await prisma.user.create({data:{
            name:user.getName(),
            cpf:user.getCpf(),
            email:user.getEmail(),
            createdAt:user.getCreatedAt(),
            passwordHash:Password.code(user.getPassword()),
            balance:user.getBalance(),
            id:user.getId()
        }})
        return user
    }
    async clear(): Promise<void> {
        await prisma.user.deleteMany()
    }

}