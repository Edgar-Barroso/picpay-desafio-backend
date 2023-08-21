import TransactionRepository from "@/domain/repository/TransactionRepository";
import UserRepository from "@/domain/repository/UserRepository";
import DatabaseRepositoryFactory from "./DatabaseRepositoryFactory";
import PrismaUserRepository from "../repository/prisma/PrismaUserRepository";
import PrismaTransactionRepository from "../repository/prisma/PrismaTransactionRepositoy";

export default class PrismaRepositoryFactory implements DatabaseRepositoryFactory{
    createUserRepository(): UserRepository {
        return new PrismaUserRepository()
    }
    createTransactionRepository(): TransactionRepository {
        return new PrismaTransactionRepository()

    }
}