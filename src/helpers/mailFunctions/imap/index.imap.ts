import Imap from "imap";
import Util from "util";
import { GetFuncInboxDef } from "../";
import { UserMessagesDef } from "../index.model";

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
            const f = imap.seq.fetch("1:*", {
                bodies: "HEADER.FIELDS (FROM TO SUBJECT DATE)",
                // struct: true,
            });

            const userInboxMessages: UserMessagesDef = { data: [] };
            f.on("message", function (msg: any, seqno: any) {
                console.log("Message #%d", seqno);
                const prefix = "(#" + seqno + ") ";
                msg.on("body", function (stream: any, info: any) {
                    let buffer = "";
                    stream.on("data", function (chunk: any) {
                        buffer += chunk.toString("utf8");
                    });
                    stream.once("end", function () {
                        const parseHeader = Imap.parseHeader(buffer);

                        // console.log("PARSED HEADER", parseHeader);

                        const { date, from, to, subject } = parseHeader;

                        const modifiedFrom = from[0]
                            .split("<")
                            .join(" ")
                            .split(">");

                        userInboxMessages.data.push({
                            dateStr: date[0],
                            from: {
                                address: modifiedFrom[1],
                                name: modifiedFrom[0],
                            },
                            to: to[0],
                            subject: subject?.length ? subject[0] : "",
                        });
                    });
                });

                msg.once("attributes", function (attrs: any) {
                    console.log(
                        prefix + "Attributes: %s",
                        Util.inspect(attrs, false, 8),
                    );
                    userInboxMessages.data[userInboxMessages.data.length - 1][
                        "date"
                    ] = attrs.date;
                    userInboxMessages.data[userInboxMessages.data.length - 1][
                        "priority"
                    ] = attrs.flags;
                    userInboxMessages.data[userInboxMessages.data.length - 1][
                        "messageId"
                    ] = attrs.uid;
                });
                msg.once("end", function () {
                    // console.log(prefix + "Finished");
                });
            });
            f.once("error", function (err: any) {
                // console.log("Fetch error: " + err);
                return props.errorHandler(err);
            });
            f.once("end", function () {
                console.log("Done fetching all messages!");
                imap.end();
                props.successHandler(userInboxMessages);
            });
        });
    });

    imap.once("error", function (err: { message: string }) {
        props.errorHandler(err);
    });

    imap.once("end", function () {
        console.log("Connection ended");
    });

    imap.connect();
}
