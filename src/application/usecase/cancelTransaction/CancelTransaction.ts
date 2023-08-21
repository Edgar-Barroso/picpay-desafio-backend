import TransactionRepository from "@/domain/repository/TransactionRepository";
import CancelTransactionInput from "./CancelTransactionInput";
import TransactionNotFoundError from "@/application/error/TransactionNotFoundError";
import TransactionService from "@/domain/service/TransactionService";
import CanceledTransaction from "@/domain/event/CanceledTransaction";
import Broker from "@/infra/broker/Broker";

export default class CancelTransaction{
    constructor(readonly transactionRepository:TransactionRepository,readonly broker:Broker){}

    async execute(input:CancelTransactionInput){

        const transaction = await this.transactionRepository.findById(input.transactionId)
        if(!transaction) throw new TransactionNotFoundError()
        const transactionService = new TransactionService(transaction)
        transactionService.cancel(input.date)
        await this.transactionRepository.update(transaction)
        this.broker.publish(new CanceledTransaction(transaction))
    }
}