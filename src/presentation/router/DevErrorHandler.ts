import ErrorHandler from "../core/ErrorHandler";
import HttpResponse from "../core/HttpResponse";

export default class DevErrorHandler implements ErrorHandler {
    errorMappings: { [key: string]: { statusCode: number} } = {
        ValidationError: { statusCode: 422},
        ZodError: { statusCode: 400},

    };

    execute(error: Error): HttpResponse {
        const errorMapping = this.errorMappings[error.constructor.name] || { statusCode: 500, message: "Internal Server Error" };
        return { statusCode: errorMapping.statusCode, body: { message: error.message } };
    }
}
