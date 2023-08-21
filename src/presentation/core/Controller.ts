import HttpRequest from "./HttpRequest";
import HttpResponse from "./HttpResponse";

export default interface Controller{
    execute(httpRequest:HttpRequest):Promise<HttpResponse>
}