import UserRepository from "@/domain/repository/UserRepository"
import Controller from "../core/Controller"
import HttpRequest from "../core/HttpRequest"
import HttpResponse from "../core/HttpResponse"
import CreateCommonClient from "@/application/usecase/createCommonClient/CreateCommonClient"
import Broker from "@/infra/broker/Broker"
import CreateCommonClientInput from "@/application/usecase/createCommonClient/CreateCommonClientInput"
import RepositoryFactory from "@/domain/factory/RepositoryFactory"

export default class CreateCommonClientController implements Controller{
    userRepository:UserRepository
    
    constructor(repositoryFactory:RepositoryFactory,readonly broker:Broker){
        this.userRepository = repositoryFactory.createUserRepository()
    }

    async execute(httpRequest:HttpRequest):Promise<HttpResponse>{

        const createUser = new CreateCommonClient(this.userRepository)
        const input:CreateCommonClientInput = httpRequest.body
        await createUser.execute(input)
        return {statusCode:201}
        }
    }
