import chai, { expect } from "chai";
import sinon from "sinon";
import chaiHttp from "chai-http";
import app from "../../index";
import { config } from "dotenv";
import { Response } from "express";
import { KeyCrypt } from "../../helpers/keyCrypt";
import { ResponseGenerator } from "../../helpers/responseGenerator";

config();
chai.use(chaiHttp);

const server = () => chai.request(app);

describe("POST /all and /one/:id", () => {
    const obj = {
        email: "email@example.com",
        password: "thePasseord",
        encType: "STARTTLS",
        serverType: "IMAP",
    };

    const theRes: Partial<Response> = {};

    before(() => {
        theRes.json = sinon.stub().returns(theRes);
        theRes.status = sinon.stub().returns(theRes);
        theRes.send = sinon.stub().returns(theRes);
    });

    after(() => {
        sinon.restore();
    });

    it("Should return 400 Bad response", async () => {
        const res = await server().post(`/all`);

        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal(
            "Please add a valid email and password",
        );
    });

    it("Should return a 400 response if email is invalid", async () => {
        const res = await server()
            .post(`/all`)
            .send({ ...obj, email: "mailnotValid" });

        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal(
            "Please provide a valid email address",
        );
    });

    it("Should return a 400 response if encryption type is not valid", async () => {
        const res = await server()
            .post(`/all`)
            .send({ ...obj, encType: "invalid" });

        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal("Please add a valid encryption type");
    });

    it("Should return a 400 response if server type is not valid", async () => {
        const res = await server()
            .post(`/all`)
            .send({ ...obj, serverType: "invalid" });

        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal("Please add a valid server type");
    });

    it("Should return id error", async () => {
        const res = await server()
            .post(`/one/0`)
            .send({ ...obj });

        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal(
            "Message Id must be a valid integer greater than 0",
        );
    });

    it("Should return Authorisation error", async () => {
        const res = await server()
            .post(`/one/2`)
            .send({ ...obj });

        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal(
            "Authentication Error: Please add a valid userKey",
        );
    });
});
