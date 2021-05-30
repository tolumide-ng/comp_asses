import "mocha";
import { Utils } from "../utils";
import sinon from "sinon";
import { Response } from "express";
import { expect } from "chai";
import { MailFunction } from ".";

describe("Mail Function Helper Class", () => {
    const res: Response = {} as Response;

    before(() => {
        res.json = sinon.stub().returns(res);
        res.status = sinon.stub().returns(res);
        res.send = sinon.stub().returns(res);
    });

    it("should return the appropriate port number", () => {
        const config = {
            email: "",
            password: "",
            host: "imap.mail.yahoo.com",
        };

        const mailFn = new MailFunction({
            ...config,
            encryption: "STARTTLS",
            serverType: "IMAP",
            action: "all",
        });

        expect(mailFn.getPort()).to.equal(993);
    });
});
