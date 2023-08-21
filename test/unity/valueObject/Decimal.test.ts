import Decimal from "@/domain/valueObject/Decimal"

test("Deve realizar uma soma",()=>{
    const number1 = new Decimal(100)
    const number2 = new Decimal(200)
    const number3 = number1.sum(number2)
    expect(number3).toMatchObject(new Decimal(300))
    expect(number3.getValue()).toBe(300)
})

test("Deve realizar uma subtracao",()=>{
    const number1 = new Decimal(100)
    const number2 = new Decimal(200)
    const number3 = number1.sub(number2)
    expect(number3).toMatchObject(new Decimal(-100))
    expect(number3.getValue()).toBe(-100)
})