export default interface AuthorizationService{
    validate(data:{id:string}):Promise<boolean>
}