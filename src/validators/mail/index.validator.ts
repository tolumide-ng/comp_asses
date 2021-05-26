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

export const hasLogin: RequestHandler = async (req, res, next) => {
    if (!req.body.password || !req.body.email) {
        return ResponseGenerator.sendError(res, 400);
    }

    next();
};

export const hasValidEmail: RequestHandler = async (req, res, next) => {
    if (req.body.email) {
        const isEmailValid =
            /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,})+$/.test(
                req.body.email,
            );

        if (isEmailValid) {
            return next();
        }
    }

    return ResponseGenerator.sendError(
        res,
        400,
        "Please provide a valid email address",
    );
};
