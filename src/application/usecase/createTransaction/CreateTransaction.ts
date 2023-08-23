import UserRepository from "@/domain/repository/UserRepository";
import UserNotFoundError from "@/application/error/UserNotFoundError";
import Transaction from "@/domain/entity/Transaction";
import TransactionRepository from "@/domain/repository/TransactionRepository";
import TransactionService from "@/domain/service/TransactionService";
import CreateTransactionInput from "./CreateTransactionInput";
import CreatedTransaction from "@/domain/event/CreatedTransaction";
import Broker from "@/infra/broker/Broker";

export default class CreateTransaction {
    constructor(
        readonly userRepository: UserRepository,
        readonly transactionRepository: TransactionRepository,
        readonly broker: Broker
    ) {}

    async execute(input: CreateTransactionInput): Promise<void> {
        const payer = await this.userRepository.findById(input.payerId);
        const payee = await this.userRepository.findById(input.payeeId);
        if (!payer || !payee) throw new UserNotFoundError();
        const transaction = new Transaction(payer, payee, input.value);
        const transactionService = new TransactionService(transaction);
        transactionService.preApprove(input.date);
        await this.transactionRepository.create(transaction);
        this.broker.publish(new CreatedTransaction(transaction));
    }
}
