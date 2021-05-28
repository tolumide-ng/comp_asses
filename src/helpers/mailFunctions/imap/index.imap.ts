import Imap from "imap";
import Util from "util";
import { GetFuncInboxDef } from "../";
import { UserMessagesDef } from "../index.model";
import { simpleParser } from "mailparser";

const fetchArgs = {
    all: (msgNumber: number) => ({
        query: "HEADER.FIELDS (FROM TO SUBJECT DATE)",
        msgFrom: `${msgNumber}:*`,
    }),
    one: (msgNumber: number) => ({
        query: ["HEADER.FIELDS (TO FROM SUBJECT DATE)", "TEXT"],
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

            const userInboxMessages: UserMessagesDef = { data: [] };
            let userSpecificMessage: { [key: string]: any } = {};

            fetchRequest.on("message", function (msg: any, seqno: any) {
                msg.on("body", function (stream: any, info: any) {
                    let buffer = "";

                    // ===========
                    if (props.action === "one") {
                        simpleParser(stream, (err: any, parsed: any) => {
                            // if (err) throw err;
                            // console.log("PARSED EMAIL>>>>>>>>>>>>", parsed);

                            // if (parsed.textAsHtml) {
                            userSpecificMessage.html = parsed.textAsHtml;

                            // console.log(
                            //     "DONE NOW>>>>>>>>",
                            //     userSpecificMessage,
                            // );
                            // }
                        });
                    }

                    stream.on("data", function (chunk: any) {
                        buffer += chunk.toString("utf8");
                    });
                    stream.once("end", function () {
                        const parseHeader = Imap.parseHeader(buffer);

                        // console.log("PARSED HERADER>>>>>>>", parseHeader);

                        const { date, from, to, subject } = parseHeader;

                        if (subject) {
                            const modifiedFrom = from
                                ? from[0].split("<").join(" ").split(">")
                                : [];

                            const headerDetails = {
                                dateStr: date[0],
                                from: {
                                    address:
                                        modifiedFrom?.length > 1 &&
                                        modifiedFrom[1],
                                    name:
                                        modifiedFrom?.length > 1 &&
                                        modifiedFrom[0],
                                },
                                to: to[0],
                                subject: subject?.length ? subject[0] : "",
                            };

                            if (props.action === "all") {
                                userInboxMessages.data.push(headerDetails);
                            } else if (props.action === "one") {
                                userSpecificMessage = {
                                    ...userSpecificMessage,
                                    ...headerDetails,
                                };
                            }
                        }
                    });
                });

                msg.once("attributes", function (attrs: any) {
                    console.log("the attributes>>>>>>>>>>>>", attrs);
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
                        userSpecificMessage = {
                            ...userSpecificMessage,
                            ...attributes,
                        };
                    }
                });

                msg.once("end", function () {
                    // console.log(
                    //     "WHAT IT IS AT THIS POINT!!!!!!!!!!!!!>>>>>>>>",
                    //     userSpecificMessage,
                    // );
                    // console.log(prefix + "Finished");
                });
            });
            fetchRequest.once("error", function (err: any) {
                return props.errorHandler(err);
            });
            fetchRequest.once("end", function () {
                imap.end();

                if (props.action === "all") {
                    props.successHandler(userInboxMessages);
                } else if (props.action === "one") {
                    props.successHandler(userSpecificMessage);
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
