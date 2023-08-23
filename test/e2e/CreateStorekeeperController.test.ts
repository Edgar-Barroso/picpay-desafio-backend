import Broker from "@/infra/broker/Broker"
import InMemoryRepositoryFactory from "@/infra/factory/InMemoryRepositoryFactory"
import PrismaRepositoryFactory from "@/infra/factory/PrismaRepositoryFactory"
import CreateStorekeeperController from "@/presentation/controller/CreateStorekeeperController"
import HttpRequest from "@/presentation/core/HttpRequest"


let sut:CreateStorekeeperController
beforeEach(async ()=>{
    const broker = new Broker()
    const repositoryFactory = new InMemoryRepositoryFactory(true)
    sut = new CreateStorekeeperController(repositoryFactory,broker)
})

test("deve criar um usuário comum com sucesso",async ()=>{
    const httpRequest:HttpRequest = {
        body:{
            name:"Jose Edgar Barroso",
            cpf:"629.925.773-32",
            email:"jose@test.com",
            password:"123456"
        }
    }
    const response = await sut.execute(httpRequest)
    expect(response.statusCode).toBe(201)
})


test("deve falhar ao tentar cadastrar um usuário faltando parametros (name)",async ()=>{
    const httpRequest:HttpRequest = {
        body:{
            cpf:"629.925.773-32",
            email:"jose@test.com",
            password:"123456"
        }
    }
    expect(async ()=> await sut.execute(httpRequest)).rejects.toBeInstanceOf(Error)
    
})


test("deve falhar ao tentar cadastrar um usuário faltando parametros (cpf)",async ()=>{
    const httpRequest:HttpRequest = {
        body:{
            name:"Jose Edgar Barroso",
            email:"jose@test.com",
            password:"123456"
        }
    }
    expect(async ()=> await sut.execute(httpRequest)).rejects.toBeInstanceOf(Error)
    
})

test("deve falhar ao tentar cadastrar um usuário faltando parametros (email)",async ()=>{
    const httpRequest:HttpRequest = {
        body:{
            name:"Jose Edgar Barroso",
            email:"jose@test.com",
            password:"123456"
        }
    }
    expect(async ()=> await sut.execute(httpRequest)).rejects.toBeInstanceOf(Error)
    
})

test("deve falhar ao tentar cadastrar um usuário faltando parametros (password)",async ()=>{
    const httpRequest:HttpRequest = {
        body:{
            name:"Jose Edgar Barroso",
            cpf:"629.925.773-32",
            email:"jose@test.com",
        }
    }
    expect(async ()=> await sut.execute(httpRequest)).rejects.toBeInstanceOf(Error)
    
})

test("deve falhar ao tentar cadastrar um usuário com cpf inválido",async ()=>{
    const httpRequest:HttpRequest = {
        body:{
            name:"Jose Edgar Barroso Neto",
            cpf:"INVALID_CPF",
            email:"jose@test.com",
            password:"123456"
        }
    }
    expect(async ()=> await sut.execute(httpRequest)).rejects.toBeInstanceOf(Error)
})

test("deve falhar ao tentar cadastrar um usuário com email inválido",async ()=>{
    const httpRequest:HttpRequest = {
        body:{
            name:"Jose Edgar Barroso Neto",
            cpf:"629.925.773-32",
            email:"INVALID_EMAIL",
            password:"123456"
        }
    }
    expect(async ()=> await sut.execute(httpRequest)).rejects.toBeInstanceOf(Error)
})

test("deve falhar ao tentar cadastrar um usuário com password inválido",async ()=>{
    const httpRequest:HttpRequest = {
        body:{
            name:"Jose Edgar Barroso Neto",
            cpf:"629.925.773-32",
            email:"jose@test.com",
            password:"INVALID PASSWORD"
        }
    }
    expect(async ()=> await sut.execute(httpRequest)).rejects.toBeInstanceOf(Error)
})