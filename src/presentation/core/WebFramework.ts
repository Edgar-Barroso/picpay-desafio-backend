import Controller from "./Controller"
import ErrorHandler from "./ErrorHandler"

export default interface WebFramework{
  ready():Promise<void>
  close():Promise<void>
  listen(port: number):Promise<void>
  close():Promise<void>
  on(url:string,method:string,controller:Controller):void
  setErrorHandler(errorHandler:ErrorHandler):void
}