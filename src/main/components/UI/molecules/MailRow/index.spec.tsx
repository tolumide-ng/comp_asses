import "@testing-library/jest-dom";
import * as React from "react";
import { fireEvent, render } from "@testing-library/react";
import { MailRow } from ".";
import { getInitials } from "../../../../utilities/reusables";
import dayjs from "dayjs";

describe("<MailRow />", () => {
    it("Renders the MailRow Component", async () => {
        const obj = {
            subject: "SUBJECT OF THE EMAIL",
            date: "2019-01-25",
            from: { address: "Tiolumide", name: "Tiolumide Shopein" },
            index: 1,
            handleSpecificMail: jest.fn(),
        };
        const { getByLabelText } = render(<MailRow {...obj} />);

        const element = getByLabelText("email");
        expect(element).toBeTruthy();
        expect(element).toHaveTextContent(obj.subject);
        expect(element).toHaveTextContent(getInitials(obj.from.name));
        expect(element).toHaveTextContent(dayjs(obj.date).format("MMM D YYYY"));
    });

    it("Fires the click eveent when user clicks on a specific row", async () => {
        const obj = {
            subject: "SUBJECT OF THE EMAIL",
            date: "2019-01-25",
            from: { address: "Tiolumide", name: "Tiolumide Shopein" },
            index: 1,
            handleSpecificMail: jest.fn(),
        };
        const { getByLabelText } = render(<MailRow {...obj} />);
        const element = getByLabelText("email");

        element.focus();
        fireEvent.click(element);
        expect(element).not.toHaveFocus();
        expect(obj.handleSpecificMail).toHaveBeenCalled();
    });
});
