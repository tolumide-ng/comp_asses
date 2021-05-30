import "@testing-library/jest-dom";
import * as React from "react";
import { fireEvent, render } from "@testing-library/react";
import { HomePage } from ".";
import { Provider } from "react-redux";
import store from "../../../store";
import { appStatusText } from "../../../utilities/reusables";

describe("<HomePage />", () => {
    it("Renders the HomePage Component", async () => {
        const { getByLabelText, getByRole } = render(
            <Provider store={store}>
                <HomePage />
            </Provider>
        );

        const element = getByLabelText("home");
        const connectButton = getByLabelText("Start");
        const formElement = getByRole("form");

        expect(element).toBeTruthy();
        expect(element).toContainElement(connectButton);
        expect(element).toContainElement(formElement);
        expect(element).toHaveTextContent(appStatusText.rest);
        expect(element).toHaveTextContent(appStatusText["rest-rest"]);
    });
});
