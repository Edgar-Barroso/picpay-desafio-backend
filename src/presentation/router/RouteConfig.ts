import Broker from "@/infra/broker/Broker";
import WebFramework from "../core/WebFramework";
import RepositoryFactory from "@/domain/factory/RepositoryFactory";
import CreateTransactionController from "../controller/CreateTransactionController";

export default class RouteConfig {
  constructor(app: WebFramework, repositoryFactory: RepositoryFactory,broker:Broker) {
    app.on("/transaction", "post",new CreateTransactionController(repositoryFactory,broker))
  }
}

