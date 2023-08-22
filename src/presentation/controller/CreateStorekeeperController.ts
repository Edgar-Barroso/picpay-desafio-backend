import UserRepository from "@/domain/repository/UserRepository"
import Controller from "../core/Controller"
import HttpRequest from "../core/HttpRequest"
import HttpResponse from "../core/HttpResponse"
import Broker from "@/infra/broker/Broker"
import CreateStorekeeperInput from "@/application/usecase/createStorekeeper/CreateStorekeeperInput"
import RepositoryFactory from "@/domain/factory/RepositoryFactory"
import CreateStorekeeper from "@/application/usecase/createStorekeeper/CreateStorekeeper"


export default class CreateStorekeeperController implements Controller{
    userRepository:UserRepository
    
    constructor(repositoryFactory:RepositoryFactory,readonly broker:Broker){
        this.userRepository = repositoryFactory.createUserRepository()
    }

    async execute(httpRequest:HttpRequest):Promise<HttpResponse>{
        const createUser = new CreateStorekeeper(this.userRepository)
        const {name,cpf,email,password} = httpRequest.body
        const input = new CreateStorekeeperInput(name,cpf,email,password)
        await createUser.execute(input)
        return {statusCode:201}
        }
    }