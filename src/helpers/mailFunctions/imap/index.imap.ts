import Imap from "imap";
import Util from "util";
import { GetFuncInboxDef } from "../";
import { UserMessagesDef } from "../index.model";
import { simpleParser } from "mailparser";
import { KeyCrypt } from "../../keyCrypt";

const fetchArgs = {
    all: (msgNumber: number) => ({
        query: "HEADER.FIELDS (FROM TO SUBJECT DATE)",
        msgFrom: `${msgNumber}:*`,
    }),
    one: (msgNumber: number) => ({
        query: "",
        msgFrom: String(msgNumber),
    }),
};

export function getImapInbox(props: GetFuncInboxDef): void {
    const imap = new Imap({
        user: props.email,
        password: props.password,
        host: props.host,
        port: props.port,
        tls: ["SSL/TLS", "STARTTLS"].includes(props.encType),
        autotls: props.encType === "STARTTLS" ? "always" : undefined,
    });

    function openInbox(cb: (err: any, box: any) => void) {
        imap.openBox("INBOX", true, cb);
    }

    imap.once("ready", function () {
        openInbox(function (err: any, box: any) {
            if (err) throw err;

            const fetchParams = fetchArgs[props.action](props.msgNumber ?? 1);

            const fetchRequest = imap.seq.fetch(fetchParams.msgFrom, {
                bodies: fetchParams.query,
            });

            const userInboxMessages: UserMessagesDef = {
                data: [],
                keys: "",
            };
            const userSpecificMessage: { [key: string]: any } = { data: {} };

            fetchRequest.on("message", function (msg: any, seqno: any) {
                msg.on("body", function (stream: any, info: any) {
                    let buffer = "";

                    stream.on("data", function (chunk: any) {
                        buffer += chunk.toString("utf8");
                    });

                    (async () => {
                        const parsed = await simpleParser(stream);
                        userSpecificMessage.data.html = parsed.textAsHtml;
                    })();

                    stream.once("end", function () {
                        const parseHeader = Imap.parseHeader(buffer);

                        const { date, from, to, subject } = parseHeader;

                        const modifiedFrom = from
                            ? from[0].split("<").join(" ").split(">")
                            : [];

                        const headerDetails = {
                            dateStr: date[0],
                            from: {
                                address:
                                    modifiedFrom?.length > 1 && modifiedFrom[1],
                                name:
                                    modifiedFrom?.length > 1 && modifiedFrom[0],
                            },
                            to: to[0],
                            subject: subject?.length ? subject[0] : "",
                        };

                        if (props.action === "all") {
                            userInboxMessages.data.push(headerDetails);
                        } else if (props.action === "one") {
                            userSpecificMessage.data = {
                                ...userSpecificMessage.data,
                                ...headerDetails,
                            };
                        }
                    });
                });

                msg.once("attributes", function (attrs: any) {
                    const attributes = {
                        priority: attrs.flags,
                        date: attrs.date,
                        messagedId: attrs.uid,
                    };
                    if (props.action === "all") {
                        userInboxMessages.data[
                            userInboxMessages.data.length - 1
                        ] = {
                            ...userInboxMessages.data[
                                userInboxMessages.data.length - 1
                            ],
                            ...attributes,
                        };
                    } else if (props.action === "one") {
                        userSpecificMessage.data = {
                            ...userSpecificMessage.data,
                            ...attributes,
                        };
                    }
                });

                msg.once("end", function () {});
            });
            fetchRequest.once("error", function (err: any) {
                return props.errorHandler(err);
            });
            fetchRequest.once("end", function () {
                imap.end();

                if (props.action === "all") {
                    KeyCrypt.encrypt(
                        {
                            email: props.email,
                            password: props.password,
                        },
                        userInboxMessages,
                    );

                    props.successHandler(userInboxMessages);
                } else if (props.action === "one") {
                    setTimeout(() => {
                        props.successHandler(userSpecificMessage);
                    }, 200);
                }
            });
        });
    });

    imap.once("error", function (err: { message: string }) {
        props.errorHandler(err);
    });

    imap.once("end", function () {
        // console.log("Connection ended");
        //
    });

    imap.connect();
}
