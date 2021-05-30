import "@testing-library/jest-dom";
import * as React from "react";
import { render } from "@testing-library/react";
import { AllMails } from ".";
import { generateRowContent } from "../../../../utilities/helpers/test_helper";

describe("<AllMails />", () => {
    it("Renders the AllMails and its child Component", async () => {
        const obj = generateRowContent();
        const arr = [{ ...obj, messageId: "12" }];
        const { getByRole } = render(
            <AllMails
                allMails={arr}
                handleSpecificMail={obj.handleSpecificMail}
            />
        );

        const ulElement = getByRole("list");
        expect(ulElement).toBeTruthy();

        arr.map((mail) => {
            const liElement = getByRole("listitem");
            expect(liElement).toBeInTheDocument();
            expect(ulElement).toContainElement(liElement);
        });
    });
});
