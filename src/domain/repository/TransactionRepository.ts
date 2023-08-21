import Transaction from "../entity/Transaction";

export default interface TransactionRepository{
    update(transaction: Transaction):Promise<Transaction>
    findById(id: string): Promise<Transaction | undefined>;
    create(transaction:Transaction):Promise<Transaction>
}