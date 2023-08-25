import CommonClient from "@/domain/entity/CommonClient"
import Transaction from "@/domain/entity/Transaction"

test("Deve ser possivel criar uma transacao",()=>{
    const user1 = new CommonClient("Barroso Neto","123.456.789-09","test1@test.com","123456",1000)
    const user2 = new CommonClient("Jose Edgar","629.925.773-32","test2@test.com","123456",1000)
    const transaction = new Transaction(user1,user2,500)
    expect(transaction.payer).toBe(user1)
    expect(transaction.payee).toBe(user2)
    expect(transaction.value).toBe(500)
    expect(transaction.getId()).toBeTruthy()
})


test("Deve ser possivel criar uma transacao",()=>{
    const user1 = new CommonClient("Barroso Neto","123.456.789-09","test1@test.com","123456",1000)
    const user2 = new CommonClient("Jose Edgar","629.925.773-32","test2@test.com","123456",1000)
    const transaction = new Transaction(user1,user2,500)
    expect(transaction.payer).toBe(user1)
    expect(transaction.payee).toBe(user2)
    expect(transaction.value).toBe(500)
    expect(transaction.getId()).toBeTruthy()
})

