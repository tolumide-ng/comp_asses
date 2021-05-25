import { RequestHandler, Response } from "express";
import { CleanObjDef, Utils } from "../utils";
import { StatusCodeDef } from "./index.model";

export class ResponseGenerator extends Utils {
    static codeResponseDict: StatusCodeDef = {
        404: "Resource Not Found",
        400: "Bad Request",
        500: "Internal Server Error",
        200: "Success",
        401: "Authentication Error",
    };

    static sendError(res: Response, statusCode: number, message: string = "") {
        const responseMessage = message
            ? message
            : this.codeResponseDict[statusCode];

        return res.status(statusCode).send({ message: responseMessage });
    }

    static sendSuccess(res: Response, statusCode: number, data: {}) {
        const cleanObj: CleanObjDef = this.removeNull(data);

        return res
            .status(statusCode)
            .send({ message: this.codeResponseDict[statusCode], ...cleanObj });
    }

    static composeHandlers(...middleware: RequestHandler[]): RequestHandler {
        return middleware.reduce(
            (currentMiddleware, nextMiddleware) => (req, res, next) => {
                currentMiddleware(req, res, (err: any) => {
                    if (err) {
                        return next(err);
                    }

                    nextMiddleware(req, res, next);
                });
            },
        );
    }
}
