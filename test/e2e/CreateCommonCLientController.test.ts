import AuthorizedTransactionNotifyHandler from "@/application/handler/AuthorizedTransactionNotifyHandler"
import CanceledTransactionNotifyHandler from "@/application/handler/CanceledTransactionNotifyHandler"
import CreatedTransactionAuthorizeHandler from "@/application/handler/CreatedTransactionAuthorizeHandler"
import Broker from "@/infra/broker/Broker"
import PrismaRepositoryFactory from "@/infra/factory/PrismaRepositoryFactory"
import MockAuthorizationService from "@/infra/service/mock/MockAuthorizationService"
import MockNotificationService from "@/infra/service/mock/MockNotificationService"
import DevErrorHandler from "@/presentation/router/DevErrorHandler"
import FastifyAdapter from "@/presentation/router/FastifyAdapter"
import RouteConfig from "@/presentation/router/RouteConfig"
import request from "supertest"


const errorHandler = new DevErrorHandler()
const app = new FastifyAdapter(errorHandler)
const repositoryFactory = new PrismaRepositoryFactory()
const broker = new Broker()
new RouteConfig(app,repositoryFactory,errorHandler,broker)


beforeAll(async ()=>{
    app.ready()
})

afterAll(async ()=>{
    app.ready()
})

test("deve criar um usuário comum com sucesso",async ()=>{
    const response = await request(app.server)
        .post('/client')
        .send({
            name :"Jose Edgar Barroso Neto",
            cpf :"629.925.773-32",
            email :"joseedgar@test.com",
            password :"123456"
        })
    expect(response.statusCode).toBe(201)
})

test("deve receber uma status 400 ao tentar criar um usuário com cpf inválido",async ()=>{
    const response = await request(app.server)
        .post('/client')
        .send({
            name :"Jose Edgar Barroso Neto",
            cpf :"629.925.773-02",
            email :"joseedgar@test.com",
            password :"123456"
        })
        expect(response.statusCode).toBe(400)
})

test("deve receber uma status 400 ao tentar criar um usuário com email inválido",async ()=>{
    const response = await request(app.server)
        .post('/client')
        .send({
            name :"Jose Edgar Barroso Neto",
            cpf :"629.925.773-32",
            email :"joseedgar@.com",
            password :"123456"
        })
        expect(response.statusCode).toBe(400)
})

test("deve receber uma status 400 ao tentar criar um usuário com senha inválida",async ()=>{
    const response = await request(app.server)
        .post('/client')
        .send({
            name :"Jose Edgar Barroso Neto",
            cpf :"629.925.773-32",
            email :"joseedgar@test.com",
            password :"123"
        })
        expect(response.statusCode).toBe(400)
})