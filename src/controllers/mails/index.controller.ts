import { Request, Response } from "express";

import { getImapInbox } from "../../helpers/mailFunctions/imap/index.imap";
import { MailFunction } from "../../helpers/mailFunctions/index.mail";
import { getPop3Inbox } from "../../helpers/mailFunctions/pop3";
import { ResponseGenerator } from "../../helpers/responseGenerator/index.helper";

export class MailController {
    static hostDict: { [key: string]: string } = {
        POP3: "pop.mail.yahoo.com",
        IMAP: "imap.mail.yahoo.com",
    };

    static async getAllInbox(req: Request, res: Response) {
        try {
            const { email, password, serverType, encType } = req.body;

            const host = MailController.hostDict[serverType];

            const getUserInbox = new MailFunction({
                email,
                password,
                serverType,
                encryption: encType,
                host,
                action: "all",
            });

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

    static async getSpecificInbox(req: Request, res: Response) {
        try {
            const { email, password, serverType, encType } = req.body;

            const { id } = req.params;

            const host = MailController.hostDict[serverType];

            const getUserInbox = new MailFunction({
                email,
                password,
                serverType,
                encryption: encType,
                host,
                action: "one",
                msgNumber: Number(id),
            });

            if (serverType === "IMAP") {
                getUserInbox.getInbox(getImapInbox, res);
            }

            if (serverType === "POP3") {
                await getUserInbox.getInbox(getPop3Inbox, res);
            }
        } catch (error) {
            return ResponseGenerator.sendError(res, 500);
        }
    }
}
