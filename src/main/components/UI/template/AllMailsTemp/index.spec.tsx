import "@testing-library/jest-dom";
import * as React from "react";
import { render } from "@testing-library/react";
import { AllMailsTemp } from ".";
import { generateRowContent } from "../../../../utilities/helpers/test_helper";

describe("<AllMailsTemp />", () => {
    it("Renders the component and its child components", async () => {
        const obj = generateRowContent();

        const handleMail = jest.fn();

        const { getByRole } = render(
            <AllMailsTemp
                allMailsStatus={"success"}
                allMails={[{ ...obj, messageId: "1" }]}
                handleSpecificMail={handleMail}
            />
        );

        const element = getByRole("feed");

        expect(element).toBeTruthy();

        const listElement = getByRole("list");
        expect(element).toContainElement(listElement);
    });

    it("Renders the loading state when the application is loading", async () => {
        const handleMail = jest.fn();

        const { getByRole } = render(
            <AllMailsTemp
                allMailsStatus={"loading"}
                allMails={[]}
                handleSpecificMail={handleMail}
            />
        );

        const element = getByRole("feed");
        expect(element).toBeTruthy();

        const loadingElement = getByRole("progressbar");
        expect(element).toContainElement(loadingElement);
    });

    it("Renders Appropriate Message if there aree no emails", async () => {
        const handleMail = jest.fn();

        const { getByLabelText, getByRole } = render(
            <AllMailsTemp
                allMailsStatus={"success"}
                allMails={[]}
                handleSpecificMail={handleMail}
            />
        );

        const element = getByRole("feed");

        expect(element).toContainElement(getByLabelText("empty mail"));
    });
});
