import * as React from "react";
import style from "./index.module.css";

interface EmptyMailDef {
    type: "one" | "all";
}

export const EmptyMail = (props: EmptyMailDef) => {
    return (
        <div className={`${style.empty} container`}>
            <p className={style.emptyText}>
                {props.type === "one"
                    ? "No Mail Selected, Please Select One to View"
                    : "Login to View Your Email"}
            </p>
        </div>
    );
};
