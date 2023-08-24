import User from "./User";

export default class CommonClient extends User{
    constructor(name: string, cpf: string, email: string, password: string,balance?:number,createdAt?:Date,id?:string) {
        super(name,cpf,email,password,balance,createdAt,id)
    }    
}