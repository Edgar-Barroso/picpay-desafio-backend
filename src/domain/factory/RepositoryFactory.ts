import TransactionRepository from "../repository/TransactionRepository"
import UserRepository from "../repository/UserRepository"


export default interface RepositoryFactory{
    createUserRepository():UserRepository
    createTransactionRepository():TransactionRepository
}