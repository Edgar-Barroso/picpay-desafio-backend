import TransactionRepository from "@/domain/repository/TransactionRepository";
import AuthorizeTransactionInput from "./AuthorizeTransactionInput";
import TransactionNotFoundError from "@/application/error/TransactionNotFoundError";
import TransactionService from "@/domain/service/TransactionService";
import Broker from "@/infra/broker/Broker";
import AuthorizedTransaction from "@/domain/event/AuthorizedTransaction";

export default class AuthorizeTransaction {
    constructor(
        readonly transactionRepository: TransactionRepository,
        readonly broker: Broker
    ) {}

    async execute(input: AuthorizeTransactionInput) {
        const transaction = await this.transactionRepository.findById(
            input.transactionId
        );
        if (!transaction) throw new TransactionNotFoundError();
        const transactionService = new TransactionService(transaction);
        
        transactionService.approve(input.date);
        await this.transactionRepository.update(transaction);
        this.broker.publish(new AuthorizedTransaction(transaction));
    }
}
