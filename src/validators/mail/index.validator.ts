import { RequestHandler } from "express";
import { ResponseGenerator } from "../../helpers/responseGenerator/index.helper";

export const hasToken: RequestHandler = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (token && token.startsWith("Bearer ")) {
            token = token.slice(7);
        }

        if (token) {
            return next();
        }

        return ResponseGenerator.sendError(res, 401);
    } catch (error) {}
};
