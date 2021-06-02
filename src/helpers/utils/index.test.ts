import "mocha";
import { Utils } from "../utils";
import { expect } from "chai";

describe("Utils Helper Class", () => {
    it("should return a clean object without falsy values", () => {
        const dirtyObj = {
            firstName: "fakerFirstName",
            lastName: "fakerLastName",
            title: null,
            middleName: "",
        };

        const cleanObj = Utils.removeNull(dirtyObj);

        expect(cleanObj).to.have.own.property("firstName");
        expect(cleanObj).to.have.own.property("lastName");
        expect(cleanObj).to.not.have.own.property("title");
        expect(cleanObj).to.not.have.own.property("middleName");
    });

    it("should return an empty object if given an empty object", () => {
        const dirtyObj = {};

        const cleanObj = Utils.removeNull(dirtyObj);

        expect(cleanObj).to.deep.equal({});
    });
});
