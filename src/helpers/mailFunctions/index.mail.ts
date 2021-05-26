import { Response } from "express";
import { MailFuncDef } from ".";
import { ResponseGenerator } from "../responseGenerator/index.helper";
import { getImapInbox, GetImapInboxDef } from "./imap";
import { mailErrorFunc } from "./mailErrors";

export class MailFunction {
    private password;
    private email;
    private serverType;
    private encryptionType;

    constructor(mailFunc: MailFuncDef) {
        this.email = mailFunc.email;
        this.password = mailFunc.password;
        this.encryptionType = mailFunc.encryption;
        this.serverType = mailFunc.serverType;
    }

    getInbox(makeCall: (props: GetImapInboxDef) => void, res: Response) {
        makeCall({
            email: this.email,
            password: this.password,
            encType: this.encryptionType,
            erroHandler: mailErrorFunc(res),
        });
    }
}
