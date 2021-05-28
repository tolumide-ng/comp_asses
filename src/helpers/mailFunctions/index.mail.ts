import { Response } from "express";
import { MailFuncDef } from ".";
import { ResponseGenerator } from "../responseGenerator/index.helper";
import { GetFuncInboxDef, PortDictDef, PortTypeDef } from "./index.model";
import { mailErrorFunc } from "./mailResponses";
import { mailSuccessFunc } from "./mailResponses/index.success";

export class MailFunction {
    private password;
    private email;
    private serverType;
    private encryptionType;
    private port;
    private host;
    private action;

    portNumber: PortDictDef = {
        IMAP: {
            "SSL/TLS": 993,
            STARTTLS: 993,
            Unencrypted: 143,
        },
        POP3: {
            "SSL/TLS": 995,
            Unencrypted: 110,
        },
    };

    constructor(mailFunc: MailFuncDef) {
        this.email = mailFunc.email;
        this.password = mailFunc.password;
        this.encryptionType = mailFunc.encryption;
        this.serverType = mailFunc.serverType;
        this.host = mailFunc.host;
        this.port = this.getPort();
        this.action = mailFunc.action;
    }

    getInbox(makeCall: (props: GetFuncInboxDef) => void, res: Response) {
        makeCall({
            email: this.email,
            password: this.password,
            encType: this.encryptionType,
            errorHandler: mailErrorFunc(res),
            port: this.port,
            host: this.host,
            successHandler: mailSuccessFunc(res),
            action: this.action,
        });
    }

    getPort(): PortTypeDef {
        return this.portNumber[this.serverType][this.encryptionType];
    }
}
