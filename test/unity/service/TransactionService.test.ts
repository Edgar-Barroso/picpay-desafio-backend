import CommonClient from "@/domain/entity/CommonClient"
import Storekeeper from "@/domain/entity/Storekeeper"
import Transaction from "@/domain/entity/Transaction"
import User from "@/domain/entity/User"
import TransactionError from "@/domain/error/InvalidTransactionError"
import TransactionService from "@/domain/service/TransactionService"

test("Deve executar uma transacao entre dois usuários comuns",()=>{
    const user1 = new CommonClient("Barroso Neto","123.456.789-09","test1@test.com","123456",1000)
    const user2 = new CommonClient("Jose Edgar","629.925.773-32","test2@test.com","123456",1000)
    const transaction = new Transaction(user1,user2,500)
    const transactionService = new TransactionService(transaction)
    transactionService.preApprove()
    transactionService.approve(new Date())
    expect(user1.getBalance()).toBe(500)
    expect(user2.getBalance()).toBe(1500)
})

test("Deve executar uma transacao entre (usuario comum e lojista)",()=>{
    const user1 = new CommonClient("Barroso Neto","123.456.789-09","test1@test.com","123456",1000)
    const user2 = new Storekeeper("Jose Edgar","629.925.773-32","test2@test.com","123456",1000)
    const transaction = new Transaction(user1,user2,500)
    const transactionService = new TransactionService(transaction)
    transactionService.preApprove()
    transactionService.approve(new Date())
    expect(user1.getBalance()).toBe(500)
    expect(user2.getBalance()).toBe(1500)
})

test("Deve falha ao tentar executar uma transferencia (lojusta para qualquer usuário)",()=>{
    const user1 = new Storekeeper("Barroso Neto","123.456.789-09","test1@test.com","123456",1000)
    const user2 = new User("Jose Edgar","629.925.773-32","test2@test.com","123456",1000)
    expect(()=>new Transaction(user1,user2,500)).toThrowError(TransactionError)
    expect(user1.getBalance()).toBe(1000)
    expect(user2.getBalance()).toBe(1000)
})


test("Deve falhar ao tentar fazer transferencia ja realizada",()=>{
    const user1 = new CommonClient("Barroso Neto","123.456.789-09","test1@test.com","123456",1000)
    const user2 = new Storekeeper("Jose Edgar","629.925.773-32","test2@test.com","123456",1000)
    const transaction = new Transaction(user1,user2,500)
    const transactionService = new TransactionService(transaction)
    transactionService.approve(new Date())
    expect(()=>transactionService.approve(new Date())).toThrowError(TransactionError)
})


