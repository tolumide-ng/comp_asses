import "@testing-library/jest-dom";
import * as React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Input } from ".";

describe("Input Component", () => {
    it("Mounts the Input Component and it's children components", async () => {
        const handleChange = jest.fn();

        const LABEL = "email";

        const { getByLabelText, getByRole } = render(
            <Input
                inputContClass=""
                inputClass=""
                inputLabelClass=""
                inputLabel={LABEL}
                inputType="text"
                inputName={LABEL}
                inputDisabled={false}
                inputValue=""
                onChange={handleChange}
                inputRequired={false}
                inputContAriaLabel="username"
            />
        );

        const element = getByLabelText("username");
        expect(element).toBeTruthy();
        expect(element).toHaveTextContent(LABEL);

        const inputElement = getByRole("textbox");
        expect(inputElement).toBeTruthy();

        expect(element).toContainElement(inputElement);
    });

    it("Handles Change event on the input text area", async () => {
        const handleChange = jest.fn();

        const LABEL = "email";

        const setup = () => {
            const inputElement = render(
                <Input
                    inputContClass=""
                    inputClass=""
                    inputLabelClass=""
                    inputLabel={LABEL}
                    inputType="text"
                    inputName={LABEL}
                    inputDisabled={false}
                    inputValue=""
                    onChange={handleChange}
                    inputRequired={false}
                    inputContAriaLabel="username"
                    inputAriaLabel={LABEL}
                />
            );
            const input = inputElement.getByLabelText(LABEL);
            return {
                input,
                ...inputElement,
            };
        };

        const { input } = setup();
        fireEvent.change(input, { target: { value: "Asa23" } });
        expect(handleChange).toHaveBeenCalled();
    });
});
