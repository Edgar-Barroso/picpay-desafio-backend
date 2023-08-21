import User from "@/domain/entity/User"
import ValidationError from "@/domain/error/ValidationError"

test("Deve ser possivel criar um usuário comum",()=>{
    const name = "Jose Edgar Barroso Neto"
    const cpf = "629.925.773-32"
    const email = "joseedgar@test.com"
    const password = "123456"
    const user = new User(name,cpf,email,password,10)
    expect(user.getName()).toBe(name)
    expect(user.getCpf()).toBe(cpf)
    expect(user.getEmail()).toBe(email)
    expect(user.getPassword()).toBe(password)
    expect(user.getBalance()).toBe(10)
})

test("Deve falhar ao validar cpf do usuário comum",()=>{
    const name = "Jose Edgar Barroso Neto"
    const cpf = "629.925.773-00"
    const email = "joseedgar@test.com"
    const password = "123456"
    expect(()=>new User(name,cpf,email,password)).toThrowError(ValidationError)
})

test("Deve falhar ao validar email do usuário comum",()=>{
    const name = "Jose Edgar Barroso Neto"
    const cpf = "629.925.773-32"
    const email = "joseedgar.com"
    const password = "123456"
    expect(()=>new User(name,cpf,email,password)).toThrowError(ValidationError)
})

test("Deve falhar ao validar senha do usuário comum",()=>{
    const name = "Jose Edgar Barroso Neto"
    const cpf = "629.925.773-32"
    const email = "joseedgar@test.com"
    const password = "131-d2=1s"
    expect(()=>new User(name,cpf,email,password)).toThrowError(ValidationError)

})

test("Deve ser possivel depositar dinheiro na conta de um usuário",()=>{
    const commonClient = new User("Jose Edgar Barroso Neto","629.925.773-32","edgar@test.com","123456")
    expect(commonClient.getBalance()).toBe(0)
    commonClient.deposit(10)
    expect(commonClient.getBalance()).toBe(10)
})

test("Deve ser possivel retirar dinheiro na conta de um usuário",()=>{
    const commonClient = new User("Jose Edgar Barroso Neto","629.925.773-32","edgar@test.com","123456")
    expect(commonClient.getBalance()).toBe(0)
    commonClient.deposit(10)
    commonClient.withdraw(5)
    expect(commonClient.getBalance()).toBe(5)
})

test("Deve negativar o saldo da conta do usuário",()=>{
    const commonClient = new User("Jose Edgar Barroso Neto","629.925.773-32","edgar@test.com","123456")
    expect(commonClient.getBalance()).toBe(0)
    commonClient.deposit(10)
    commonClient.withdraw(25)
    expect(commonClient.getBalance()).toBe(-15)

})

test("Deve falhar ao transitar valores negativos na conta do usuário",()=>{
    const commonClient = new User("Jose Edgar Barroso Neto","629.925.773-32","edgar@test.com","123456")
    expect(commonClient.getBalance()).toBe(0)
    commonClient.deposit(100)
    expect(()=>commonClient.withdraw(-20)).toThrowError(new Error("Invalid withDraw"))
    expect(()=>commonClient.deposit(-20)).toThrowError(new Error("Invalid deposit"))

})