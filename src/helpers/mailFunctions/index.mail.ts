import { Response } from "express";
import { MailFuncDef } from ".";
import { ResponseGenerator } from "../responseGenerator/index.helper";
import { GetFuncInboxDef, PortTypeDef } from "./index.model";
import { mailErrorFunc } from "./mailErrors";

export class MailFunction {
    private password;
    private email;
    private serverType;
    private encryptionType;
    private port;
    private host;

    constructor(mailFunc: MailFuncDef) {
        this.email = mailFunc.email;
        this.password = mailFunc.password;
        this.encryptionType = mailFunc.encryption;
        this.serverType = mailFunc.serverType;
        this.host = mailFunc.host;
        this.port = this.getPort();
    }

    getInbox(makeCall: (props: GetFuncInboxDef) => void, res: Response) {
        makeCall({
            email: this.email,
            password: this.password,
            encType: this.encryptionType,
            errorHandler: mailErrorFunc(res),
            port: this.port,
            host: this.host,
        });
    }

    getPort(): PortTypeDef {
        if (this.serverType === "IMAP") {
            if (["SSL/TLS", "STARTTLS"].includes(this.encryptionType)) {
                return 993;
            }

            if (this.encryptionType === "Unencrypted") {
                return 143;
            }
        }

        if (this.serverType === "POP3") {
            if (["SSL/TLS", "STARTTLS"].includes(this.encryptionType)) {
                return 995;
            }
        }

        // POP3 this.encryptionType === "Unencrypted"
        return 110;
    }
}
