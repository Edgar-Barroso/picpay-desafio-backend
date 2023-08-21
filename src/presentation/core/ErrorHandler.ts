import HttpResponse from "./HttpResponse";

export default interface ErrorHandler{
    execute(error:Error):HttpResponse
}