import * as React from "react";
import { AppLoader } from "../../atoms/AppLoader";
import style from "./index.module.css";

export const LoadingContainer = () => {
    return (
        <div
            className="container"
            aria-busy={true}
            aria-label="Loading Content"
        >
            <AppLoader context="light" size="small" />
        </div>
    );
};
