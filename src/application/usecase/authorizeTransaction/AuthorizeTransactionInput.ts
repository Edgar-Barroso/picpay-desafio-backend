export default class AuthorizeTransactionInput{
    constructor(readonly transactionId:string,readonly date:Date = new Date()){}
}