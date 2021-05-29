import * as React from "react";
import { Initials } from "../../atoms/Initials";
import style from "./index.module.css";

interface MailRowDef {
    subject: string;
    date: Date | string;
    from: { name: string; address: string };
}

export const MailRow = (props: MailRowDef) => {
    return (
        <div className={style.mailRow}>
            <div className={style.mailRowLeft}>
                <Initials name={props.from.name} />
            </div>
            <div className={style.mailRowRight}>
                <div className={style.mailRowRightTop}></div>
                <div className={style.mailRowRightBottom}></div>
            </div>
        </div>
    );
};
