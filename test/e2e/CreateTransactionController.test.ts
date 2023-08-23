import AuthorizedTransactionNotifyHandler from "@/application/handler/AuthorizedTransactionNotifyHandler"
import CanceledTransactionNotifyHandler from "@/application/handler/CanceledTransactionNotifyHandler"
import CreatedTransactionAuthorizeHandler from "@/application/handler/CreatedTransactionAuthorizeHandler"
import CommonClient from "@/domain/entity/CommonClient"
import Storekeeper from "@/domain/entity/Storekeeper"
import Broker from "@/infra/broker/Broker"
import InMemoryRepositoryFactory from "@/infra/factory/InMemoryRepositoryFactory"
import InMemoryUserRepository from "@/infra/repository/inMemory/InMemoryUserRepository"
import MockAuthorizationService from "@/infra/service/mock/MockAuthorizationService"
import MockNotificationService from "@/infra/service/mock/MockNotificationService"
import CreateTransactionController from "@/presentation/controller/CreateTransactionController"
import HttpRequest from "@/presentation/core/HttpRequest"

let sut:CreateTransactionController
let commonClient:CommonClient
let storekeeper:Storekeeper
let userRepository:InMemoryUserRepository

beforeEach(async ()=>{
    const name = "Jose Edgar Barroso Neto"
    const cpf = "629.925.773-32"
    const email = "joseedgar@test.com"
    const password = "123456"
    commonClient = new CommonClient(name,cpf,email,password,100)
    storekeeper = new Storekeeper(name,"830.108.770-64","barrosonetojose@gmail.com",password,100)
    const repositoryFactory = new InMemoryRepositoryFactory(true)
    const broker = new Broker()
    broker.register(new CanceledTransactionNotifyHandler(new MockNotificationService()))
    broker.register(new AuthorizedTransactionNotifyHandler(new MockNotificationService()))
    broker.register(new CreatedTransactionAuthorizeHandler(new MockAuthorizationService(),repositoryFactory.createTransactionRepository(),broker))
    userRepository = repositoryFactory.createUserRepository()
    await userRepository.create(commonClient)
    await userRepository.create(storekeeper)
    sut = new CreateTransactionController(repositoryFactory,broker)
})

test("deve criar uma transação com sucesso",async ()=>{
    const httpRequest:HttpRequest = {
        body:{
            value:100,
            payer:commonClient.getId(),
            payee:storekeeper.getId()
        }
    }

    const response = await sut.execute(httpRequest)

})