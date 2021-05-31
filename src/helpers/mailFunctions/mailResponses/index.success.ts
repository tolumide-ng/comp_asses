import { Response } from "express";
import { ResponseGenerator } from "../../responseGenerator";

export const mailSuccessFunc =
    (res: Response) =>
    (info: object, code: number = 200) => {
        return ResponseGenerator.sendSuccess(res, code, { ...info });
    };
