import TransactionNotFoundError from "@/application/error/TransactionNotFoundError";
import UserNotFoundError from "@/application/error/UserNotFoundError";
import ValidationError from "@/domain/error/ValidationError";
import { ZodError } from "zod";
import ErrorHandler from "../core/ErrorHandler";
import HttpResponse from "../core/HttpResponse";
import UserAlreadyExistsError from "@/application/error/UserAlreadExistsError";
import TransactionError from "@/domain/error/TransactionError";

export default class DevErrorHandler implements ErrorHandler {
    execute(error: Error): HttpResponse {
        if (error instanceof ValidationError || error instanceof ZodError) {
            return { statusCode: 400 };
        } else if (error instanceof TransactionNotFoundError || error instanceof UserNotFoundError) {
            return { statusCode: 404, body: { message: error.message } };
        } else if (error instanceof UserAlreadyExistsError) {
            return { statusCode: 409, body: { message: error.message } };
        } else if (error instanceof TransactionError) {
            return { statusCode: 422, body: { message: error.message } };
        } else {
            return { statusCode: 500, body: { message: "Internal Server Error" } };
        }
    }
}
