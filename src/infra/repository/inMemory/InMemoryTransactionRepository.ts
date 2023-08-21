import Transaction from "@/domain/entity/Transaction";
import TransactionRepository from "@/domain/repository/TransactionRepository";

export default class InMemoryTransactionRepository implements TransactionRepository{
    items:Transaction[]
    constructor(){
        this.items = []
    }
    async update(transaction: Transaction): Promise<Transaction> {
        this.items = this.items.map((item)=>item.getId()===transaction.getId() ? transaction: item)
        return transaction
    }
    
    async findById(id: string): Promise<Transaction | undefined> {
        return this.items.find(item=>item.getId()===id)
    }

    async create(transaction: Transaction): Promise<Transaction> {
        this.items.push(transaction)
        return transaction

    }
    
}