import Controller from "./Controller"
import ErrorHandler from "./ErrorHandler"

export default interface WebFramework{
  listen(port: number):Promise<void>
  close():Promise<void>
  on(url:string,method:string,controller:Controller):void
  setErrorHandler(errorHandler:ErrorHandler):void
}