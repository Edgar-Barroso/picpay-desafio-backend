export default class ValidationError extends Error{
    constructor(message:string){
        super(`Validation Error: ${message}`)
    }
}