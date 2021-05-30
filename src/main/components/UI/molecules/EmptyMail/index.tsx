import * as React from "react";
import style from "./index.module.css";

interface EmptyMailDef {
    text: string;
}

export const EmptyMail = (props: EmptyMailDef) => {
    return (
        <div className={`${style.empty} container`} aria-label="empty mail">
            <p className={style.emptyText}>{props.text}</p>
        </div>
    );
};
