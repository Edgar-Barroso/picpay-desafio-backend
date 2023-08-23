export default class UserAlreadyExistsError extends Error{
    constructor(){
        super("User alread exists")
    }
}