import "@testing-library/jest-dom";
import * as React from "react";
import { render } from "@testing-library/react";
import { LoadingContainer } from ".";

describe("Loading Container", () => {
    it("Mounts the Loading Container component", async () => {
        const { getByLabelText, getByRole } = render(<LoadingContainer />);

        const element = getByLabelText("Loading Content");

        expect(element).toBeTruthy();

        const progressElement = getByRole("progressbar");
        expect(element).toContainElement(progressElement);
    });
});
