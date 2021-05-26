import { Request, Response } from "express";

import { getImapInbox } from "../../helpers/mailFunctions/imap/index.imap";
import { MailFunction } from "../../helpers/mailFunctions/index.mail";
import { ResponseGenerator } from "../../helpers/responseGenerator/index.helper";

export class MailController {
    static getAllInbox(req: Request, res: Response) {
        try {
            const { email, password, serverType, encType } = req.body;

            const getUserInbox = new MailFunction({
                email,
                password,
                serverType,
                encryption: encType,
            });

            if (serverType === "IMAP") {
                getUserInbox.getInbox(getImapInbox, res);
            }
        } catch (error) {
            return ResponseGenerator.sendError(res, 500);
        }
    }
}
