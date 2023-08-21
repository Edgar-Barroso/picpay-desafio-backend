import TransactionRepository from "@/domain/repository/TransactionRepository";
import UserRepository from "@/domain/repository/UserRepository";

export default interface DatabaseRepositoryFactory{
    createUserRepository():UserRepository
    createTransactionRepository():TransactionRepository    
}