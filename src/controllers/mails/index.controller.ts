import { Request, Response } from "express";
import { ImapFunc } from "../../helpers/mailFunctions/imap/index.imap";

export class MailController {
    static getAllInbox(req: Request, res: Response) {
        const { email, password } = req.body;

        const allInbox = new ImapFunc();
    }
}
