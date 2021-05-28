import { Response } from "express";
import { ResponseGenerator } from "../../responseGenerator/index.helper";

export const mailSuccessFunc =
    (res: Response) =>
    (info: object, code: number = 200) => {
        return ResponseGenerator.sendSuccess(res, code, { data: info });
    };
