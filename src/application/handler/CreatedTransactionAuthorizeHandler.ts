import TransactionRepository from "@/domain/repository/TransactionRepository";
import AuthorizeTransaction from "../usecase/authorizeTransaction/AuthorizeTransation";
import AuthorizeTransactionInput from "../usecase/authorizeTransaction/AuthorizeTransactionInput";
import CancelTransaction from "../usecase/cancelTransaction/CancelTransaction";
import CancelTransactionInput from "../usecase/cancelTransaction/CancelTransactionInput";
import CreatedTransaction from "@/domain/event/CreatedTransaction";
import Broker from "@/infra/broker/Broker";
import Handler from "@/infra/broker/Handler";
import AuthorizationService from "../service/AuthorizationService";

export default class CreatedTransactionAuthorizeHandler implements Handler {
  name = "CreatedTransaction";

  constructor(readonly authorizationService: AuthorizationService,readonly transactionsRepository:TransactionRepository,readonly broker:Broker) {}

  async handle(event: CreatedTransaction) {
    const isAuthorized = await this.authorizationService.validate({id:event.transaction.getId()});
    if (isAuthorized) {
      const authorizedTransaction = new AuthorizeTransaction(this.transactionsRepository,this.broker);
      authorizedTransaction.execute(new AuthorizeTransactionInput(event.transaction.getId()))
    } else {
      const cancelTransaction = new CancelTransaction(this.transactionsRepository,this.broker);
      cancelTransaction.execute(new CancelTransactionInput(event.transaction.getId()))
    }
  }
}
