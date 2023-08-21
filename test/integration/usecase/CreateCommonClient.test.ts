import UserAlreadExistsError from "@/application/error/UserAlreadExistsError";
import CreateCommonClient from "@/application/usecase/createCommonClient/CreateCommonClient";
import CreateCommonClientInput from "@/application/usecase/createCommonClient/CreateCommonClientInput";
import InMemoryUserRepository from "@/infra/repository/inMemory/InMemoryUserRepository";

let sut: CreateCommonClient;
let userRepository: InMemoryUserRepository;

beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new CreateCommonClient(userRepository);
});

test("Deve criar um usuário com sucesso", async () => {
    const input = new CreateCommonClientInput(
        "Jose Edgar Barroso Neto",
        "629.925.773-32",
        "joseedgar@test.com",
        "123456"
    );
    await sut.execute(input);
    expect(userRepository.items).toHaveLength(1);
});

test("Deve falhar ao tentar criar um usuário com cpf repetido", async () => {
    const input1 = new CreateCommonClientInput(
        "Jose Edgar Barroso Neto",
        "629.925.773-32",
        "joseedgar1@test.com",
        "123456"
    );
    const input2 = new CreateCommonClientInput(
        "Jose Edgar Barroso Neto",
        "629.925.773-32",
        "joseedgar2@test.com",
        "123456"
    );
    await sut.execute(input1);
    expect(async () => await sut.execute(input2)).rejects.toThrowError(
        UserAlreadExistsError
    );
});

test("Deve falhar ao tentar criar um usuário com email repetido", async () => {
    const input1 = new CreateCommonClientInput(
        "Jose Edgar Barroso Neto",
        "629.925.773-32",
        "joseedgar@test.com",
        "123456"
    );
    const input2 = new CreateCommonClientInput(
        "Jose Edgar Barroso Neto",
        "760.664.030-01",
        "joseedgar@test.com",
        "123456"
    );
    await sut.execute(input1);
    expect(async () => await sut.execute(input2)).rejects.toThrowError(
        UserAlreadExistsError
    );
});
