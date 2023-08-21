import TransactionRepository from "@/domain/repository/TransactionRepository";
import UserRepository from "@/domain/repository/UserRepository";
import DatabaseRepositoryFactory from "./DatabaseRepositoryFactory";
import InMemoryUserRepository from "../repository/inMemory/InMemoryUserRepository";
import InMemoryTransactionRepository from "../repository/inMemory/InMemoryTransactionRepository";

export default class InMemoryRepositoryFactory implements DatabaseRepositoryFactory{
    createUserRepository(): UserRepository {
        return new InMemoryUserRepository()
    }
    createTransactionRepository(): TransactionRepository {
        return new InMemoryTransactionRepository()

    }
}