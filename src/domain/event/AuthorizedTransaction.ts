import DomainEvent from "@/infra/broker/DomainEvent";
import Transaction from "../entity/Transaction";

export default class AuthorizedTransaction implements DomainEvent{
    name = "AuthorizedTransaction";
    constructor(readonly transaction:Transaction){}

}