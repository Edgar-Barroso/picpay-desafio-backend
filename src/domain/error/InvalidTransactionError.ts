export default class TransactionError extends Error{
    constructor(message:string){
        super(message)
    }
}