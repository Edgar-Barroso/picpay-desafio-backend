export default class TransactionNotFoundError extends Error{
    constructor(){
        super("Transaction not found")
    }
}