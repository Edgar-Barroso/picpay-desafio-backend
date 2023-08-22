import Transaction from "../entity/Transaction";
import TransactionError from "../error/InvalidTransactionError";

export default class TransactionService{

    constructor(readonly transaction:Transaction){
    }

    preApprove(date:Date){
        const {payer,value} = this.transaction
        if(value > payer.getBalance()) throw new TransactionError("Insufficient funds")
        payer.withdraw(value)
        this.transaction.setCreatedAt(date)
        return value
    }

    approve(date:Date){
        if(this.transaction.getExecutedAt()) throw new TransactionError("Transaction already executed")
        if(this.transaction.getCanceledAt()) throw new TransactionError("Transaction already canceled")
        const {payee,value} = this.transaction
        payee.deposit(value)
        this.transaction.setExecutedAt(date)
        return value
    }

    cancel(date: Date) {
        if(this.transaction.getExecutedAt()) throw new TransactionError("Transaction already executed")
        if(this.transaction.getCanceledAt()) throw new TransactionError("Transaction already canceled")
        const {payer,value} = this.transaction
        payer.deposit(value)
        this.transaction.setCanceledAt(date)
        return value
    }
}