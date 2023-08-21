import DomainEvent from "@/infra/broker/DomainEvent";
import Transaction from "../entity/Transaction";

export default class CreatedTransaction implements DomainEvent{
    name = "CreatedTransaction";
    constructor(readonly transaction:Transaction){}

}