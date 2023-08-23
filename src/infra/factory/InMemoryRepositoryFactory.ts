import TransactionRepository from "@/domain/repository/TransactionRepository";
import UserRepository from "@/domain/repository/UserRepository";
import DatabaseRepositoryFactory from "./DatabaseRepositoryFactory";
import InMemoryUserRepository from "../repository/inMemory/InMemoryUserRepository";
import InMemoryTransactionRepository from "../repository/inMemory/InMemoryTransactionRepository";

export default class InMemoryRepositoryFactory implements DatabaseRepositoryFactory{
    private userRepository:InMemoryUserRepository | undefined
    private transactionepository:InMemoryTransactionRepository | undefined
    constructor(readonly isSingleton?:boolean){
    }

    createUserRepository(): InMemoryUserRepository {
        if(!this.isSingleton) return new InMemoryUserRepository()
        if(!this.userRepository) this.userRepository = new InMemoryUserRepository()
        return this.userRepository
    }
    createTransactionRepository(): InMemoryTransactionRepository {
        if(!this.isSingleton) return new InMemoryTransactionRepository()
        if(!this.transactionepository) this.transactionepository = new InMemoryTransactionRepository()
        return this.transactionepository
    }
}