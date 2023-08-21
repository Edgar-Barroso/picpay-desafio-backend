export default interface NotificationService{
    notify(data:{ids:string[],event: string}):Promise<void>

}