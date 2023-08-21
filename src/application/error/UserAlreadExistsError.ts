export default class UserAlreadExistsError extends Error{
    constructor(){
        super("User alread exists")
    }
}