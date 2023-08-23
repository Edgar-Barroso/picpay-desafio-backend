import TransactionError from "../error/TransactionError";
import UniqueEntityId from "../valueObject/UniqueEntityId";
import Storekeeper from "./Storekeeper";
import User from "./User";

export default class Transaction{
    private id:UniqueEntityId
    private createdAt:Date | undefined
    private executedAt:Date | undefined
    private canceledAt:Date | undefined
    constructor(readonly payer:User,readonly payee:User,readonly value:number,id?:string,createdAt?:Date,executedAt?:Date,canceledAt?:Date){
        if(payer instanceof Storekeeper) throw new TransactionError("Storekeeper payer")
        this.id = new UniqueEntityId(id)
        this.canceledAt = createdAt
        this.executedAt = executedAt
        this.canceledAt = canceledAt
    }

    getId(){
        return this.id.getValue()
    }

    getExecutedAt(){
        return this.executedAt
    }

    setExecutedAt(date:Date) {
        this.executedAt = date
    }

    getCanceledAt() {
        return this.canceledAt
    }

    setCanceledAt(date:Date) {
        this.canceledAt = date
    }   
    
    getCreatedAt(){
        return this.createdAt
    }
    
    setCreatedAt(date: Date) {
        this.createdAt = date
    }

    getValue(): number {
        return this.value
    }
}