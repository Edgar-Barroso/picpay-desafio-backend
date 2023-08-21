export default class Decimal{
    private value:number

    constructor(value?:number){
        this.value = value ?? 0
    }

    sum(decimal:Decimal):Decimal{
        const sumValue = this.getValue() + decimal.getValue()
        return new Decimal(sumValue)
    }

    sub(decimal:Decimal):Decimal{
        const subValue = this.getValue() - decimal.getValue() 
        return new Decimal(subValue)
    }

    getValue(){
        return this.value
    }
}