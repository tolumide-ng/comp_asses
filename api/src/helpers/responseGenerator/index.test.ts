import "mocha";
import { Utils } from "../utils";
import sinon from "sinon";
import { Response } from "express";
import { expect } from "chai";
import { ResponseGenerator } from ".";

describe("Response Generator Helper Class", () => {
    const res: Partial<Response> = {};

    before(() => {
        res.json = sinon.stub().returns(res);
        res.status = sinon.stub().returns(res);
        res.send = sinon.stub().returns(res);
    });

    it("should call the extended class' static method", () => {
        const mock = sinon.mock(Utils);
        mock.expects("removeNull").once();

        ResponseGenerator.sendSuccess(res as Response, 200, {});

        mock.verify();
        mock.restore();
    });

    it("should send an error response", () => {
        const message: string = "Bad Request";
        const statusCode = 400;

        res.send = sinon.stub().returns({
            message,
            statusCode,
        });

        const errorResponse = ResponseGenerator.sendError(
            res as Response,
            400,
            message,
        );

        expect(errorResponse).deep.equal({ message, statusCode });
    });
});
