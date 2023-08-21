import fastify, { FastifyReply, FastifyRequest } from "fastify"
import Controller from "../core/Controller";
import ErrorHandler from "../core/ErrorHandler";
import HttpRequest from "../core/HttpRequest";
import HttpResponse from "../core/HttpResponse";
import WebFramework from "../core/WebFramework";

export default class FastifyAdapter implements WebFramework {

  app: any;

  constructor(readonly errorHandler:ErrorHandler) {
    this.app = fastify();

  }
  setErrorHandler(errorHandler: ErrorHandler): void {
    this.app.setErrorHandler((error:Error, _:any, reply:FastifyReply) => {
      const {statusCode,body} = errorHandler.execute(error)
      return reply.status(statusCode).send(body);
  })
  }

  
  on(url: string, method: string,controller: Controller): void {
    this.app[method](url,async (request: FastifyRequest, reply: FastifyReply) => {
      const httpRequest:HttpRequest = {
        ...request
      }
      const response:HttpResponse = await controller.execute(httpRequest)
      return reply.status(response.statusCode).send(response.body);
    });
  }


  async close():Promise<void>{
    await this.app.close()
  }

  async listen(port: number):Promise<void> {
    this.app
      .listen({
        port: port,
      })
      .then(() => {
        console.log(`🚀 HTTP Server Running! PORT:${port}`);
      });
  }
}
