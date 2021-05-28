import { Response } from "express";
import { ResponseGenerator } from "../../responseGenerator/index.helper";

export const mailErrorFunc =
    (res: Response) =>
    (error: { message: string }, code: number = 500) => {
        console.log("THE ERROR>>>>>>>", error?.message);
        if (error.message.includes("Timed out")) {
            return ResponseGenerator.sendError(
                res,
                code,
                "Request Timed Out: Please try again later",
            );
        }

        return ResponseGenerator.sendError(res, code);
    };
