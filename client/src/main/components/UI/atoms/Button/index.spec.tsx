import "@testing-library/jest-dom";
import * as React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Button } from ".";

describe("Button Component", () => {
    it("Mounts  the Button Component", async () => {
        const handleClick = jest.fn();

        const { getByLabelText, getByText } = render(
            <Button
                buttonClass=""
                buttonText="Click"
                buttonType="button"
                buttonAriaLabel="click"
                handleClick={handleClick}
            />
        );

        const element = getByLabelText("click");
        expect(element).toBeTruthy();

        const textElem = getByText("Click");
        expect(textElem).toBeInTheDocument();
    });

    it("Emits Click event when button is Clicked", () => {
        const handleClick = jest.fn();

        const { getByLabelText, getByRole } = render(
            <Button
                buttonClass=""
                buttonText="Click"
                buttonType="button"
                buttonAriaLabel="click"
                handleClick={handleClick}
            />
        );

        const element = getByLabelText("click");
        expect(element).toBeTruthy();

        const buttonElement = getByRole("button");
        buttonElement.focus();

        fireEvent.click(buttonElement);

        expect(buttonElement).toHaveFocus();
        expect(buttonElement).toHaveTextContent("Click");

        expect(handleClick).toHaveBeenCalled();
    });
});
