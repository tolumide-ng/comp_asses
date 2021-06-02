import "@testing-library/jest-dom";
import * as React from "react";
import { render } from "@testing-library/react";
import { Initials } from ".";
import { getInitials } from "../../../../utilities/reusables";

describe("Initials Component", () => {
    it("Mounts the Initials Component", async () => {
        const USER_NAME = "Tolumide Shopein";

        const { getByLabelText } = render(<Initials name={USER_NAME} />);

        const element = getByLabelText("User Initials");
        expect(element).toBeTruthy();

        expect(element).toHaveTextContent(getInitials(USER_NAME));
    });
});
