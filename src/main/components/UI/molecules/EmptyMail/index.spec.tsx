import "@testing-library/jest-dom";
import * as React from "react";
import { render } from "@testing-library/react";
import { EmptyMail } from ".";

describe("EmptyMails Component", () => {
    it("Mounts the Empty Mails Component", async () => {
        const EMPTY_TEXT = "You do not have any emails at the moment";

        const { getByLabelText } = render(<EmptyMail text={EMPTY_TEXT} />);

        const element = getByLabelText("empty mail");
        expect(element).toBeTruthy();
        expect(element).toHaveTextContent(EMPTY_TEXT);
        expect(element).toHaveAttribute("aria-label");
    });
});
