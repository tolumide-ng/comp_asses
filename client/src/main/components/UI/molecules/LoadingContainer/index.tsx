import * as React from "react";
import { AppLoader } from "../../atoms/AppLoader";
import style from "./index.module.css";

interface LoadingContainerDef {
    text?: string;
}

export const LoadingContainer = (props: LoadingContainerDef) => {
    return (
        <div
            className={`${style.load} container`}
            aria-busy={true}
            aria-label="Loading Content"
        >
            <AppLoader context="light" size="small" />
            <p className={style.loadText}>{props.text}</p>
        </div>
    );
};
