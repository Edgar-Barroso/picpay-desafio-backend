import TransactionNotFoundError from "@/application/error/TransactionNotFoundError";
import CancelTransaction from "@/application/usecase/cancelTransaction/CancelTransaction";
import CancelTransactionInput from "@/application/usecase/cancelTransaction/CancelTransactionInput";
import CommonClient from "@/domain/entity/CommonClient";
import Transaction from "@/domain/entity/Transaction";
import TransactionError from "@/domain/error/TransactionError";
import TransactionService from "@/domain/service/TransactionService";
import Broker from "@/infra/broker/Broker";
import InMemoryTransactionRepository from "@/infra/repository/inMemory/InMemoryTransactionRepository";


let sut: CancelTransaction
let transactionRepository: InMemoryTransactionRepository;
let user1: CommonClient;
let user2: CommonClient;
let transaction: Transaction
let transactionService: TransactionService


beforeEach(async () => {
    const name = "Jose Edgar Barroso Neto";
    const cpf = "629.925.773-32";
    const email = "joseedgar@test.com";
    const password = "123456";
    transactionRepository = new InMemoryTransactionRepository();
    user1 = new CommonClient(name,cpf,email,password,100)
    user2 = new CommonClient(name,cpf,email,password,100)
    transaction = new Transaction(user1,user2,100)
    transactionService = new TransactionService(transaction)
    transactionService.preApprove(new Date())
    await transactionRepository.create(transaction)
    const broker = new Broker();
    sut = new CancelTransaction(transactionRepository, broker);
});

test("Deve cancelar uma transação pendente",async ()=>{
    const input = new CancelTransactionInput(transaction.getId())
    await sut.execute(input)
    expect(transactionRepository.items[0].getExecutedAt()).toBeFalsy()
    expect(transactionRepository.items[0].getCanceledAt()).toBeTruthy()
})

test("Deve cancelar uma transação ja executada",async ()=>{
    const input = new CancelTransactionInput(transaction.getId())
    transactionService.approve(new Date())
    expect(async ()=>await sut.execute(input)).rejects.toThrowError(TransactionError)
})

test("Deve cancelar uma transação ja cancelada",async ()=>{
    const input = new CancelTransactionInput(transaction.getId())
    transactionService.cancel(new Date())
    expect(async ()=>await sut.execute(input)).rejects.toThrowError(TransactionError)
})


test("Deve falhar ao tentar cancelar uma transação que não existe",async ()=>{
    const input = new CancelTransactionInput("notExistId")
    expect(async ()=>await sut.execute(input)).rejects.toThrowError(TransactionNotFoundError)
})
