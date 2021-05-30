import * as React from "react";
import { getInitials } from "../../../../utilities/reusables";
import style from "./index.module.css";

interface InitialsDef {
    name: string;
}

export const Initials = (props: InitialsDef) => {
    return (
        <div aria-label="User Initials" className={style.initials}>
            {getInitials(props.name)}
        </div>
    );
};
