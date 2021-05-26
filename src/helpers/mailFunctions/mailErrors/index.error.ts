import { Response } from "express";
import { ResponseGenerator } from "../../responseGenerator/index.helper";

export const mailErrorFunc =
    (res: Response) => (error: { message: string }) => {
        console.log("THE ERROR>>>>>>>", error?.message);
        if (error.message.includes("Timed out")) {
            return ResponseGenerator.sendError(
                res,
                500,
                "Request Timed Out: Please try again later",
            );
        }
    };
