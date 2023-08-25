import CommonClient from "@/domain/entity/CommonClient"

test("Deve ser possivel criar um lojista",()=>{
    const name = "Jose Edgar Barroso Neto"
    const cpf = "629.925.773-32"
    const email = "joseedgar@test.com"
    const password = "123456"
    const user = new CommonClient(name,cpf,email,password,10)
    expect(user.getName()).toBe(name)
    expect(user.getCpf()).toBe(cpf)
    expect(user.getEmail()).toBe(email)
    expect(user.getPassword()).toBe(password)
    expect(user.getBalance()).toBe(10)
})