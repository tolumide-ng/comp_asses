import * as React from "react";
import { AppLoader } from "../../atoms/AppLoader";
import style from "./index.module.css";

export const LoadingContainer = () => {
    return (
        <div className="container">
            <AppLoader context="light" size="big" />
        </div>
    );
};
