import DomainEvent from "@/infra/broker/DomainEvent";
import Transaction from "../entity/Transaction";

export default class CanceledTransaction implements DomainEvent{
    name = "CanceledTransaction";
    constructor(readonly transaction:Transaction){}

}