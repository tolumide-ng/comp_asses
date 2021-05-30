import "@testing-library/jest-dom";
import * as React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Connection } from ".";

export const generateConnectionProps = (error: string | null) => ({
    handleAllMails: jest.fn(),
    loading: false,
    error,
});

describe("<Connection />", () => {
    it("Renders the Connection and its children components", async () => {
        const { getByRole } = render(
            <Connection {...generateConnectionProps(null)} />
        );

        const element = getByRole("form");
        expect(element).toBeTruthy();

        const buttonElement = getByRole("button");
        expect(element).toContainElement(buttonElement);
        expect(element).toHaveTextContent("Encryption");
        expect(element).toHaveTextContent("Server Type");
        expect(element).toHaveTextContent("username");
        expect(element).toHaveTextContent("password");
        expect(element).toHaveTextContent("port");
    });

    it("Displays Error messages", async () => {
        const ERROR = "Please enter your email address";

        const { getByRole } = render(
            <Connection {...generateConnectionProps(ERROR)} />
        );

        const element = getByRole("form");
        expect(element).toBeTruthy();

        expect(element).toHaveTextContent(ERROR);
    });

    it("Fires the Submit event Start button is clicked", async () => {
        const obj = generateConnectionProps(null);
        const { getByRole } = render(<Connection {...obj} />);

        const element = getByRole("form");
        expect(element).toBeTruthy();

        const buttonElement = getByRole("button");
        buttonElement.focus();
        fireEvent.click(buttonElement);

        expect(buttonElement).toHaveTextContent("Start");
        expect(buttonElement).toHaveFocus();
        expect(obj.handleAllMails).toHaveBeenCalled();
    });
});
