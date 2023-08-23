import UserAlreadyExistsError from "@/application/error/UserAlreadExistsError";
import CreateStorekeeper from "@/application/usecase/createStorekeeper/CreateStorekeeper";
import CreateStorekeeperInput from "@/application/usecase/createStorekeeper/CreateStorekeeperInput";
import InMemoryUserRepository from "@/infra/repository/inMemory/InMemoryUserRepository";

let sut: CreateStorekeeper;
let userRepository: InMemoryUserRepository;

beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new CreateStorekeeper(userRepository);
});

test("Deve criar um usuário com sucesso", async () => {
    const input = new CreateStorekeeperInput(
        "Jose Edgar Barroso Neto",
        "629.925.773-32",
        "joseedgar@test.com",
        "123456"
    );
    await sut.execute(input);
    expect(userRepository.items).toHaveLength(1);
});

test("Deve falhar ao tentar criar um usuário com cpf repetido", async () => {
    const input1 = new CreateStorekeeperInput(
        "Jose Edgar Barroso Neto",
        "629.925.773-32",
        "joseedgar1@test.com",
        "123456"
    );
    const input2 = new CreateStorekeeperInput(
        "Jose Edgar Barroso Neto",
        "629.925.773-32",
        "joseedgar2@test.com",
        "123456"
    );
    await sut.execute(input1);
    expect(async () => await sut.execute(input2)).rejects.toThrowError(
        UserAlreadyExistsError
    );
});

test("Deve falhar ao tentar criar um usuário com email repetido", async () => {
    const input1 = new CreateStorekeeperInput(
        "Jose Edgar Barroso Neto",
        "629.925.773-32",
        "joseedgar@test.com",
        "123456"
    );
    const input2 = new CreateStorekeeperInput(
        "Jose Edgar Barroso Neto",
        "760.664.030-01",
        "joseedgar@test.com",
        "123456"
    );
    await sut.execute(input1);
    expect(async () => await sut.execute(input2)).rejects.toThrowError(
        UserAlreadyExistsError
    );
});
