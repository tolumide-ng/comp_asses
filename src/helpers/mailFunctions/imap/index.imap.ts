import Imap from "imap";
import { inspect } from "util";
import { ImapFuncDef } from ".";
import { ResponseGenerator } from "../../responseGenerator/index.helper";

export class ImapFunc {
    private encryptionType;
    private email;
    private password;
    private imapInstance: Imap | null = null;

    constructor(imapInit: ImapFuncDef) {
        this.encryptionType = imapInit.encryption;
        this.email = imapInit.email;
        this.password = imapInit.password;
    }

    initiateInstance() {
        this.imapInstance = new Imap({
            user: this.email,
            password: this.password,
            host: "imap.gmx.com",
            port: 993,
            tls: this.encryptionType === "SSL/TLS",
            autotls: this.encryptionType === "STARTTLS" ? "always" : "",
        });

        this.receiveInbox();
    }

    openInbox(callback: (err: any, box: any) => void) {
        this.imapInstance?.openBox("INBOX", true, callback);
    }

    receiveInbox() {
        this.imapInstance?.once("read", () => {
            this.openInbox((err: any, box: any) => {
                if (err) {
                    throw err;
                }

                const theFetch = this.imapInstance?.seq.fetch("1:3", {
                    bodies: "HEADER.FIELDS (FROM TO SUBJECT DATE)",
                    struct: true,
                });

                theFetch?.on("message", function (msg, seqno) {
                    console.log("Message #%d", seqno);
                    const prefix = `(#${seqno})`;

                    // does this event listener mean I can use this part to determine when I want and do not need the body
                    msg.on("body", function (stream, info) {
                        let buffer = "";
                        stream.on("data", function (chunk) {
                            buffer += chunk.toString("utf8");
                        });

                        stream.once("end", function () {
                            console.log(
                                `${prefix} Parsed header: %s, ${inspect(
                                    Imap.parseHeader(buffer),
                                )}`,
                            );
                        });
                    });

                    msg.once("attributes", function (attrs) {
                        console.log(
                            `${prefix} Attributes %s ${inspect(
                                attrs,
                                false,
                                8,
                            )}`,
                        );
                    });

                    msg.once("end", function () {
                        console.log(`${prefix} finished`);
                    });
                });

                theFetch?.once("error", function (err) {
                    console.log(`Fetch Error: ${err}`);
                });

                const endInstance = () => this.imapInstance?.end();

                theFetch?.once("end", function () {
                    console.log("Done fetching all messages");
                    endInstance();
                });
            });
        });

        this.imapInstance?.once("error", function (err: string) {
            console.log("THE ERROR", err);
            return "Authentication Error";
            // return ResponseGenerator.sendError(res, 401);
        });

        this.imapInstance?.once("end", function () {
            console.log("Connection ended");
        });

        this.imapInstance?.connect();
    }
}
