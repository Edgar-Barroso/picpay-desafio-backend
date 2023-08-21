export default class CreateTransactionInput{
    constructor(readonly value:number,readonly payerId:string,readonly payeeId:string,readonly date:Date = new Date()){}
}