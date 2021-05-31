import { Request, Response } from "express";
import { FetchActionTypeDef, MailFuncDef } from "../../helpers/mailFunctions";

import { getImapInbox } from "../../helpers/mailFunctions/imap/index.imap";
import { MailFunction } from "../../helpers/mailFunctions/index.mail";
import { getPop3Inbox } from "../../helpers/mailFunctions/pop3";
import { ResponseGenerator } from "../../helpers/responseGenerator";

export class MailController {
    static hostDict: { [key: string]: string } = {
        POP3: "pop.mail.yahoo.com",
        IMAP: "imap.mail.yahoo.com",
    };

    private static async handleRequest(
        req: Request,
        res: Response,
        requestType: FetchActionTypeDef,
    ) {
        try {
            const { email, password, serverType, encType } = req.body;

            const host = MailController.hostDict[serverType];

            const config: MailFuncDef = {
                email,
                password,
                serverType,
                encryption: encType,
                host,
                action: requestType,
            };

            if (requestType === "one") {
                const { id } = req.params;
                config["msgNumber"] = Number(id);
            }

            const getUserInbox = new MailFunction(config);

            if (serverType === "IMAP") {
                getUserInbox.getInbox(getImapInbox, res);
            }

            if (serverType === "POP3") {
                getUserInbox.getInbox(getPop3Inbox, res);
            }
        } catch (error) {
            return ResponseGenerator.sendError(res, 500);
        }
    }

    static async getAllInbox(req: Request, res: Response) {
        try {
            await MailController.handleRequest(req, res, "all");
        } catch (error) {
            return ResponseGenerator.sendError(res, 500);
        }
    }

    static async getSpecificInbox(req: Request, res: Response) {
        try {
            await MailController.handleRequest(req, res, "one");
        } catch (error) {
            return ResponseGenerator.sendError(res, 500);
        }
    }
}
