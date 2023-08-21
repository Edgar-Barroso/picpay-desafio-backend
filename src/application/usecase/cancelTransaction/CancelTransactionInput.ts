export default class CancelTransactionInput{
    constructor(readonly transactionId:string,readonly date:Date = new Date()){}
}