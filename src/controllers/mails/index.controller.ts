import { Request, Response } from "express";

import { getImapInbox } from "../../helpers/mailFunctions/imap/index.imap";
import { MailFunction } from "../../helpers/mailFunctions/index.mail";
import { getPopInbox } from "../../helpers/mailFunctions/pop/index.pop";
import { getPop3Inbox } from "../../helpers/mailFunctions/pop3/index.pop3";
import { ResponseGenerator } from "../../helpers/responseGenerator/index.helper";

export class MailController {
    static async getAllInbox(req: Request, res: Response) {
        try {
            const { email, password, serverType, encType } = req.body;

            const host =
                serverType === "POP3"
                    ? "pop.mail.yahoo.com"
                    : "imap.mail.yahoo.com";

            const getUserInbox = new MailFunction({
                email,
                password,
                serverType,
                encryption: encType,
                host,
            });

            if (serverType === "IMAP") {
                getUserInbox.getInbox(getImapInbox, res);
            }

            if (serverType === "POP3") {
                // getUserInbox.getInbox(getPopInbox, res);
                await getUserInbox.getInbox(getPop3Inbox, res);
            }
        } catch (error) {
            return ResponseGenerator.sendError(res, 500);
        }
    }
}
