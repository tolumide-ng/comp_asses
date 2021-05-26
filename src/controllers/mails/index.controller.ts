import { Request, Response } from "express";
import { ImapFunc } from "../../helpers/mailFunctions/imap/index.imap";
import { ResponseGenerator } from "../../helpers/responseGenerator/index.helper";

export class MailController {
    static getAllInbox(req: Request, res: Response) {
        try {
            const { email, password, serverType, encType } = req.body;

            const allInbox = new ImapFunc({
                encryption: encType,
                email,
                password,
            });

            console.log("ALL OF THE INBOX???????/", allInbox);
        } catch (error) {
            return ResponseGenerator.sendError(res, 500);
        }
    }
}
