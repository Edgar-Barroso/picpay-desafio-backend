import AuthorizedTransactionNotifyHandler from "./application/handler/AuthorizedTransactionNotifyHandler";
import CanceledTransactionNotifyHandler from "./application/handler/CanceledTransactionNotifyHandler";
import CreatedTransactionAuthorizeHandler from "./application/handler/CreatedTransactionAuthorizeHandler";
import Broker from "./infra/broker/Broker";
import PrismaRepositoryFactory from "./infra/factory/PrismaRepositoryFactory";
import HttpAuthorizationService from "./infra/service/http/HttpAuthorizationService";
import HttpNotificationService from "./infra/service/http/HttpNotificationService";
import DevErrorHandler from "./presentation/router/DevErrorHandler";
import FastifyAdapter from "./presentation/router/FastifyAdapter";
import RouteConfig from "./presentation/router/RouteConfig";

const errorHandler = new DevErrorHandler()
const app = new FastifyAdapter(errorHandler)
const repositoryFactory = new PrismaRepositoryFactory()
const broker = new Broker()
broker.register(new CanceledTransactionNotifyHandler(new HttpNotificationService()))
broker.register(new AuthorizedTransactionNotifyHandler(new HttpNotificationService()))
broker.register(new CreatedTransactionAuthorizeHandler(new HttpAuthorizationService(),repositoryFactory.createTransactionRepository(),broker))
new RouteConfig(app,repositoryFactory,errorHandler,broker)

export default app