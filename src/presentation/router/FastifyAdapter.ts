import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import Controller from "../core/Controller";
import ErrorHandler from "../core/ErrorHandler";
import HttpRequest from "../core/HttpRequest";
import HttpResponse from "../core/HttpResponse";
import WebFramework from "../core/WebFramework";

export default class FastifyAdapter implements WebFramework {
  app:any;
  server: any;

  constructor(readonly errorHandler:ErrorHandler) {
    this.app = fastify();
    this.server = this.app.server
  }

  async ready(): Promise<void> {
    await this.app.ready()
  }
  async close(): Promise<void> {
    await this.app.close()
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
