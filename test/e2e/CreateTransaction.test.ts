import AuthorizedTransactionNotifyHandler from "@/application/handler/AuthorizedTransactionNotifyHandler";
import CanceledTransactionNotifyHandler from "@/application/handler/CanceledTransactionNotifyHandler";
import CreatedTransactionAuthorizeHandler from "@/application/handler/CreatedTransactionAuthorizeHandler";
import CommonClient from "@/domain/entity/CommonClient";
import Storekeeper from "@/domain/entity/Storekeeper";
import User from "@/domain/entity/User";
import UserRepository from "@/domain/repository/UserRepository";
import Broker from "@/infra/broker/Broker";
import InMemoryRepositoryFactory from "@/infra/factory/InMemoryRepositoryFactory";
import PrismaRepositoryFactory from "@/infra/factory/PrismaRepositoryFactory";
import MockAuthorizationService from "@/infra/service/mock/MockAuthorizationService";
import MockNotificationService from "@/infra/service/mock/MockNotificationService";
import DevErrorHandler from "@/presentation/router/DevErrorHandler";
import FastifyAdapter from "@/presentation/router/FastifyAdapter";
import RouteConfig from "@/presentation/router/RouteConfig";
import request from "supertest";
const errorHandler = new DevErrorHandler();
const app = new FastifyAdapter(errorHandler);
const repositoryFactory = new PrismaRepositoryFactory();
const broker = new Broker();
broker.register(
  new CanceledTransactionNotifyHandler(new MockNotificationService())
);
broker.register(
  new AuthorizedTransactionNotifyHandler(new MockNotificationService())
);
broker.register(
  new CreatedTransactionAuthorizeHandler(
    new MockAuthorizationService(),
    repositoryFactory.createTransactionRepository(),
    broker
  )
);
new RouteConfig(app, repositoryFactory, errorHandler, broker);
let user1: User;
let user2: User;
let userRepository: UserRepository;
beforeAll(async () => {
  app.ready();
  userRepository = repositoryFactory.createUserRepository();
  user1 = new CommonClient(
    "Jose Edgar Barroso Neto",
    "629.925.773-32",
    "joseedgar1@test.com",
    "123456",
    1000
  );
  user2 = new Storekeeper(
    "Jose Edgar Barroso Neto",
    "774.994.860-01",
    "joseedgar2@test.com",
    "123456",
    1000
  );
  await userRepository.create(user1);
  await userRepository.create(user2);
});

afterAll(async () => {
  app.ready();
});

test("deve criar realizar uma transação", async () => {
  const response = await request(app.server).post("/transaction").send({
    value: 100,
    payer: user1.getId(),
    payee: user2.getId(),
  });
  expect(response.statusCode).toBe(201);
});

test("deve falhar ao tentar realizar uma transação inválida", async () => {
  const response = await request(app.server).post("/transaction").send({
    value: 100,
    payer: user2.getId(),
    payee: user1.getId(),
  });
  expect(response.statusCode).toBe(422);
});

test("deve criar realizar uma sequencia de transações", async () => {
  for (let i = 0; i < 10; i++) {
    request(app.server).post("/transaction").send({
      value: 100,
      payer: user1.getId(),
      payee: user2.getId(),
    });
  }
});
