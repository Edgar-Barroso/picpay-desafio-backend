import TransactionNotFoundError from "@/application/error/TransactionNotFoundError";
import AuthorizeTransactionInput from "@/application/usecase/authorizeTransaction/AuthorizeTransactionInput";
import AuthorizeTransaction from "@/application/usecase/authorizeTransaction/AuthorizeTransation";
import CommonClient from "@/domain/entity/CommonClient";
import Transaction from "@/domain/entity/Transaction";
import TransactionError from "@/domain/error/TransactionError";
import TransactionService from "@/domain/service/TransactionService";
import Broker from "@/infra/broker/Broker";
import InMemoryTransactionRepository from "@/infra/repository/inMemory/InMemoryTransactionRepository";

let sut: AuthorizeTransaction
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
    sut = new AuthorizeTransaction(transactionRepository, broker);
});

test("Deve authorizar uma transação pendente",async ()=>{
    const input = new AuthorizeTransactionInput(transaction.getId())
    await sut.execute(input)
    expect(transactionRepository.items[0].getExecutedAt()).toBeTruthy()
    expect(transactionRepository.items[0].getCanceledAt()).toBeFalsy()
})

test("Deve authorizar uma transação ja executada",async ()=>{
    const input = new AuthorizeTransactionInput(transaction.getId())
    transactionService.approve(new Date())
    expect(async ()=>await sut.execute(input)).rejects.toThrowError(TransactionError)
})

test("Deve authorizar uma transação ja cancelada",async ()=>{
    const input = new AuthorizeTransactionInput(transaction.getId())
    transactionService.cancel(new Date())
    expect(async ()=>await sut.execute(input)).rejects.toThrowError(TransactionError)
})


test("Deve falhar ao tentar authorizar uma transação que não existe",async ()=>{
    const input = new AuthorizeTransactionInput("notExistId")
    expect(async ()=>await sut.execute(input)).rejects.toThrowError(TransactionNotFoundError)
})
