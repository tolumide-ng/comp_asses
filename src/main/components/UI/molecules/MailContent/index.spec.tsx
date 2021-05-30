import "@testing-library/jest-dom";
import * as React from "react";
import { render } from "@testing-library/react";
import { MailContent } from ".";

describe("<MailContent />", () => {
    it("Mounts the MailContent Component", () => {
        const CONTENT = "<p>HTML TO DISPLAY</p>";

        const { getByRole } = render(<MailContent content={CONTENT} />);

        const element = getByRole("article");
        expect(element).toBeTruthy();
        expect(element).toContainHTML(CONTENT);
    });
});
