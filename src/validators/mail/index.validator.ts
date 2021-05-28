import { RequestHandler } from "express";
import { ResponseGenerator } from "../../helpers/responseGenerator/index.helper";

const validEncryptionTypes = ["Unencrypted", "SSL/TLS", "STARTTLS"];

const validServerType = ["IMAP", "POP3"];

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
    console.log("==============+++++++++====================", req.body);
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

export const hasValidEncryptionType: RequestHandler = (req, res, next) => {
    if (validEncryptionTypes.includes(req.body?.encType)) {
        return next();
    }

    return ResponseGenerator.sendError(
        res,
        400,
        "Please add a valid encryption type",
    );
};

export const hasValidServerType: RequestHandler = (req, res, next) => {
    if (validServerType.includes(req.body.serverType)) {
        return next();
    }

    return ResponseGenerator.sendError(
        res,
        400,
        "Please add a valid server type",
    );
};



export const hasValidId: RequestHandler = (req, res, next) => {
    if(Number(req.params.id) > 0){
        return next()
    }


    return ResponseGenerator.sendError(
        res,
        400,
        "Message Id must be a valid integer greater than 0",
    );
}