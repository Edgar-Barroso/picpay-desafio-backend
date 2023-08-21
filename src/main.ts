import AuthorizedTransactionNotifyHandler from "./application/handler/AuthorizedTransactionNotifyHandler";
import CanceledTransactionNotifyHandler from "./application/handler/CanceledTransactionNotifyHandler";
import CreatedTransactionAuthorizeHandler from "./application/handler/CreatedTransactionAuthorizeHandler";
import Broker from "./infra/broker/Broker";
import PrismaRepositoryFactory from "./infra/factory/PrismaRepositoryFactory";
import MockAuthorizationService from "./infra/service/mock/MockAuthorizationService";
import MockNotificationService from "./infra/service/mock/MockNotificationService";
import DevErrorHandler from "./presentation/router/DevErrorHandler";
import FastifyAdapter from "./presentation/router/FastifyAdapter";
import RouteConfig from "./presentation/router/RouteConfig";

const errorHandler = new DevErrorHandler()
const app = new FastifyAdapter(errorHandler)
const repositoryFactory = new PrismaRepositoryFactory()
const broker = new Broker()
broker.register(new CanceledTransactionNotifyHandler(new MockNotificationService()))
broker.register(new AuthorizedTransactionNotifyHandler(new MockNotificationService()))
broker.register(new CreatedTransactionAuthorizeHandler(new MockAuthorizationService(),repositoryFactory.createTransactionRepository(),broker))
new RouteConfig(app,repositoryFactory,broker)

export default app