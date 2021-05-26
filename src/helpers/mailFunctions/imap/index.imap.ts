import Imap from "imap";
import util from "util";

import { ResponseGenerator } from "../../responseGenerator/index.helper";
import { GetImapInboxDef } from ".";
import { Response } from "express";

export function getImapInbox(props: GetImapInboxDef): void {
    const imap = new Imap({
        user: props.email,
        password: props.password,
        host: "imap.mail.yahoo.com",
        port: 993,
        tls: props.encType === "SSL/TLS",
        autotls: props.encType === "STARTTLS" ? "always" : undefined,
    });

    function openInbox(cb: (err: any, box: any) => void) {
        imap.openBox("INBOX", true, cb);
    }

    imap.once("ready", function () {
        openInbox(function (err: any, box: any) {
            if (err) throw err;
            const f = imap.seq.fetch("1:3", {
                bodies: "HEADER.FIELDS (FROM TO SUBJECT DATE)",
                struct: true,
            });
            f.on("message", function (msg: any, seqno: any) {
                console.log("Message #%d", seqno);
                const prefix = "(#" + seqno + ") ";
                msg.on("body", function (stream: any, info: any) {
                    let buffer = "";
                    stream.on("data", function (chunk: any) {
                        buffer += chunk.toString("utf8");
                    });
                    stream.once("end", function () {
                        console.log(
                            prefix + "Parsed header: %s",
                            util.inspect(Imap.parseHeader(buffer)),
                        );
                    });
                });
                msg.once("attributes", function (attrs: any) {
                    console.log(
                        prefix + "Attributes: %s",
                        util.inspect(attrs, false, 8),
                    );
                });
                msg.once("end", function () {
                    console.log(prefix + "Finished");
                });
            });
            f.once("error", function (err: any) {
                console.log("Fetch error: " + err);
            });
            f.once("end", function () {
                console.log("Done fetching all messages!");
                imap.end();
            });
        });
    });

    imap.once("error", function (err: { message: string }) {
        console.log("{{{{{{{{{{{{{{{{{{ ERROR", err);
        props.erroHandler(err);
        return ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>===================";
    });

    imap.once("end", function () {
        console.log("Connection ended");
    });

    imap.connect();
}
