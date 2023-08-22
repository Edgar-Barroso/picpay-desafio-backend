import Broker from "@/infra/broker/Broker";
import WebFramework from "../core/WebFramework";
import RepositoryFactory from "@/domain/factory/RepositoryFactory";
import CreateTransactionController from "../controller/CreateTransactionController";
import CreateCommonClientController from "../controller/CreateCommonClientController";
import CreateStorekeeperController from "../controller/CreateStorekeeperController";

export default class RouteConfig {
  constructor(app: WebFramework, repositoryFactory: RepositoryFactory,broker:Broker) {
    app.on("/transaction", "post",new CreateTransactionController(repositoryFactory,broker))
    app.on("/client", "post",new CreateCommonClientController(repositoryFactory,broker))
    app.on("/storekeeper", "post",new CreateStorekeeperController(repositoryFactory,broker))
  }
}

