import Cpf from "../valueObject/Cpf";
import Decimal from "../valueObject/Decimal";
import Email from "../valueObject/Email";
import Password from "../valueObject/Password";
import UniqueEntityId from "../valueObject/UniqueEntityId";

export default class User {
    private id:UniqueEntityId;
    private name: string;
    private cpf: Cpf;
    private email: Email;
    private password: Password;
    private balance: Decimal;
    private createdAt: Date;

    constructor(name: string, cpf:string, email: string, password: string,balance?:number,createdAt?:Date,id?:string) {
        this.id = new UniqueEntityId(id)
        this.name = name;
        this.cpf = new Cpf(cpf)
        this.email = new Email(email);
        this.password = new Password(password);
        this.balance = new Decimal(balance)
        this.createdAt = createdAt ?? new Date()
    }

    deposit(value: number) {
        if(value <= 0) throw new Error("Invalid deposit")
        this.balance = this.balance.sum(new Decimal(value))

    }

    withdraw(value: number) {
        if(value <= 0) throw new Error("Invalid withDraw")
        this.balance = this.balance.sub(new Decimal(value))

    }

    getName() {
        return this.name;
    }

    getCpf() {
        return this.cpf.getValue();
    }

    getEmail() {
        return this.email.getValue();
    }

    getPassword() {
        return this.password.getValue();
    }

    getBalance(){
        return this.balance.getValue()
    }
    getId() {
        return this.id.getValue()
    }
    getCreatedAt():Date {
        return this.createdAt
    }
}
