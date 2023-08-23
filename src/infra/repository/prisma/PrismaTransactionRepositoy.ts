import Transaction from "@/domain/entity/Transaction";
import TransactionRepository from "@/domain/repository/TransactionRepository";
import prisma from "./Prisma";
import User from "@/domain/entity/User";
import Password from "@/domain/valueObject/Password";

export default class PrismaTransactionRepository implements TransactionRepository{
    private async findUserById(id:string):Promise<User | undefined>{
        const userData = await prisma.user.findUnique({where:{id}})
        if (!userData) return undefined
        const {name,cpf,email,balance,createdAt,passwordHash} = userData
        const user = new User(name,cpf,email,Password.decode(passwordHash),balance,createdAt,id)
        return user
    }
    private async updateUser(user:User):Promise<void>{
        await prisma.user.update({where:{id:user.getId()},data:{
            id:user.getId(),
            name:user.getName(),
            cpf:user.getCpf(),
            email:user.getEmail(),
            balance:user.getBalance(),
            passwordHash:Password.code(user.getPassword()),
            createdAt:user.getCreatedAt()
        }})
        
    }

    async update(transaction: Transaction): Promise<Transaction> {
        await Promise.all([
            this.updateUser(transaction.payer),
            this.updateUser(transaction.payee)
          ]);
        await prisma.transaction.update({where:{id:transaction.getId()},data:{
            id:transaction.getId(),
            payer_id:{connect:{id:transaction.payer.getId()}},
            payee_id:{connect:{id:transaction.payee.getId()}},
            value:transaction.getValue(),
            createdAt:transaction.getCreatedAt(),
            executedAt:transaction.getExecutedAt(),
            canceledAt:transaction.getCanceledAt()
        }})
        return transaction
    }

    async findById(id: string): Promise<Transaction | undefined> {
        const transactionData = await prisma.transaction.findUnique({where:{id}})
        if(!transactionData) return undefined
        const {value,payerId,payeeId,createdAt,executedAt,canceledAt} = transactionData
        const [payer, payee] = await Promise.all([
            this.findUserById(payerId),
            this.findUserById(payeeId)
          ]);
        if(!payer || !payee) return undefined
        const transaction = new Transaction(payer,payee,value,id,createdAt ?? undefined,executedAt ?? undefined,canceledAt ?? undefined)
        return transaction

    
    }
    async create(transaction: Transaction): Promise<Transaction> {
        await Promise.all([
            this.updateUser(transaction.payer),
            this.updateUser(transaction.payee)
          ]);
        await prisma.transaction.create({data:{
            id:transaction.getId(),
            value:transaction.getValue(),
            payer_id:{connect:{id:transaction.payer.getId()}},
            payee_id:{connect:{id:transaction.payee.getId()}},
            createdAt:transaction.getCreatedAt(),
            executedAt:transaction.getExecutedAt(),
            canceledAt:transaction.getCanceledAt(),
        }})
        return transaction
    }

}