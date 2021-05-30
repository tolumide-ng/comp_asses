import "@testing-library/jest-dom";
import * as React from "react";
import { render } from "@testing-library/react";
import { AppLoader } from "./index";

describe("AppLoader Component", () => {
    it("Mounts and renders the component", async () => {
        const { getByRole } = render(<AppLoader size="big" context="light" />);

        const element = getByRole("progressbar");

        expect(element).toBeTruthy();
    });
});
