import UserRepository from "@/domain/repository/UserRepository"
import Controller from "../core/Controller"
import HttpRequest from "../core/HttpRequest"
import HttpResponse from "../core/HttpResponse"
import CreateTransaction from "@/application/usecase/createTransaction/CreateTransaction"
import TransactionRepository from "@/domain/repository/TransactionRepository"
import Broker from "@/infra/broker/Broker"
import CreateTransactionInput from "@/application/usecase/createTransaction/CreateTransactionInput"
import RepositoryFactory from "@/domain/factory/RepositoryFactory"


export default class CreateTransactionController implements Controller{
    userRepository:UserRepository
    transactionRepository:TransactionRepository
    
    constructor(repositoryFactory:RepositoryFactory,readonly broker:Broker){
        this.userRepository = repositoryFactory.createUserRepository()
        this.transactionRepository = repositoryFactory.createTransactionRepository()
    }

    async execute(httpRequest:HttpRequest):Promise<HttpResponse>{
        const createUser = new CreateTransaction(this.userRepository,this.transactionRepository,this.broker)
        const input = new CreateTransactionInput(httpRequest.body.value,httpRequest.body.payer,httpRequest.body.payee)
        await createUser.execute(input)
        return {statusCode:201}
        }
    }