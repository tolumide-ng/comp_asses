import { Response } from "express";
import { ResponseGenerator } from "../../responseGenerator/index.helper";

export const mailErrorFunc =
    (res: Response) =>
    (error: { message: string }, code: number = 500) => {
        if (error.message.includes("Timed out")) {
            return ResponseGenerator.sendError(
                res,
                code,
                "Request Timed Out: Please try again later",
            );
        }

        if (error.message.toLowerCase().includes("credentials")) {
            return ResponseGenerator.sendError(res, 401);
        }

        return ResponseGenerator.sendError(res, code);
    };
