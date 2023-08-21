import UserNotFoundError from "@/application/error/UserNotFoundError";
import CreatedTransactionAuthorizeHandler from "@/application/handler/CreatedTransactionAuthorizeHandler";
import CreateTransaction from "@/application/usecase/createTransaction/CreateTransaction";
import CreateTransactionInput from "@/application/usecase/createTransaction/CreateTransactionInput";
import CommonClient from "@/domain/entity/CommonClient";
import Storekeeper from "@/domain/entity/Storekeeper";
import TransactionError from "@/domain/error/InvalidTransactionError";
import Broker from "@/infra/broker/Broker";
import InMemoryTransactionRepository from "@/infra/repository/inMemory/InMemoryTransactionRepository";
import InMemoryUserRepository from "@/infra/repository/inMemory/InMemoryUserRepository";

let sut: CreateTransaction;
let userRepository: InMemoryUserRepository;
let transactionRepository: InMemoryTransactionRepository;
let user1: CommonClient;
let user2: CommonClient;
let user3: Storekeeper;

beforeEach(async () => {
    const name = "Jose Edgar Barroso Neto";
    const cpf = "629.925.773-32";
    const email = "joseedgar@test.com";
    const password = "123456";
    userRepository = new InMemoryUserRepository();
    transactionRepository = new InMemoryTransactionRepository();
    user1 = new CommonClient(name, cpf, email, password, 1000);
    user2 = new CommonClient(name, cpf, email, password, 10);
    user3 = new Storekeeper(name, cpf, email, password, 50);
    await userRepository.create(user1);
    await userRepository.create(user2);
    await userRepository.create(user3);
    const broker = new Broker();
    sut = new CreateTransaction(userRepository, transactionRepository, broker);
});

test("Deve criar uma transação de um usuário (comum - comum)", async () => {
    const input = new CreateTransactionInput(100, user1.getId(), user2.getId());
    await sut.execute(input);
    expect(transactionRepository.items).toHaveLength(1);
});

test("Deve criar uma transação de um usuário (comum - lojista)", async () => {
    const input = new CreateTransactionInput(100, user1.getId(), user3.getId());
    await sut.execute(input);
    expect(transactionRepository.items).toHaveLength(1);
});

test("Deve falhar ao tentar criar uma transferencia de usuários que nao existem", async () => {
    const input = new CreateTransactionInput(20, "notExistsId", user1.getId());
    expect(async () => await sut.execute(input)).rejects.toThrowError(
        UserNotFoundError
    );
});

test("Deve falhar ao tentar transferir dinheiro do lojista", async () => {
    const input = new CreateTransactionInput(20, user3.getId(), user1.getId());
    expect(async () => await sut.execute(input)).rejects.toThrowError(
        new TransactionError("Storekeeper payer")
    );
});

test("Deve falhar ao tentar transferir com saldo insuficiente", async () => {
    const input = new CreateTransactionInput(100, user2.getId(), user1.getId());
    expect(async () => await sut.execute(input)).rejects.toThrowError(
        new TransactionError("Insufficient funds")
    );
});
