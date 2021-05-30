import "@testing-library/jest-dom";
import * as React from "react";
import { fireEvent, render } from "@testing-library/react";
import { SpecificEmail } from ".";
import dayjs from "dayjs";
import { getInitials } from "../../../../utilities/reusables";

const generateProps = () => ({
    handleGoBack: jest.fn(),
    html: "<p>the html text</p>",
    subject: "subject of the email",
    messagedId: "messageId",
    from: { name: "senders name", address: "address@email.com" },
    to: "examplae@example.com",
    date: "27-02-1994",
});

describe("<SpecificEmail/>", () => {
    it("Renders the SpecificEmail component", async () => {
        const props = generateProps();

        const { getByLabelText } = render(<SpecificEmail {...props} />);

        const element = getByLabelText("specific email");

        expect(element).toBeTruthy();

        expect(element).toHaveTextContent(
            dayjs(props.date).format("MMMM D YYYY")
        );
        expect(element).toHaveTextContent(props.from.address);
        expect(element).toHaveTextContent(getInitials(props.from.name));
        expect(element).toContainHTML(props.html);
    });

    it("Triggers go back when the button is clicked", async () => {
        const props = generateProps();

        props.handleGoBack = jest.fn();

        const { getByLabelText, getByRole } = render(
            <SpecificEmail {...props} />
        );

        const element = getByLabelText("specific email");

        const buttonElement = getByRole("button");

        expect(element).toContainElement(buttonElement);
        buttonElement.focus();
        expect(buttonElement).toHaveFocus();

        fireEvent.click(buttonElement);
    });
});
