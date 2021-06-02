import "@testing-library/jest-dom";
import * as React from "react";
import { render } from "@testing-library/react";
import { SpecificMailTemp } from ".";
import {
    generateRowContent,
    generateSpecificMailContent,
} from "../../../../utilities/helpers/test_helper";

describe("<SpecificMailTemp />", () => {
    const props = {
        displayClass: "",
        handleGoBack: jest.fn(),
        data: { ...generateSpecificMailContent() },
    };
    it("Renders SpecificMailTemp component", async () => {
        const { getByLabelText } = render(
            <SpecificMailTemp
                {...props}
                status="success"
                allMailsStatus="success"
            />
        );

        const element = getByLabelText("view email");
        const emailElement = getByLabelText("specific email");

        expect(element).toBeTruthy();
        expect(element).toContainElement(emailElement);
    });

    it("Renders the loading component in the loading state", async () => {
        const { getByLabelText, getByRole } = render(
            <SpecificMailTemp
                {...props}
                status="loading"
                allMailsStatus="success"
            />
        );

        const element = getByLabelText("view email");
        const loaderElement = getByRole("progressbar");

        expect(element).toBeTruthy();
        expect(element).toContainElement(loaderElement);
    });
});
