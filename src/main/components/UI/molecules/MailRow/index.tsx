import * as React from "react";
import style from "./index.module.css";

interface MailRowDef {
    subject: string;
    date: Date | string;
    from: { name: string; address: string };
}

export const MailRow = () => {
    return (
        <div className={style.mailRow}>
            <div className={style.mailRowLeft}></div>
            <div className={style.mailRowRight}>
                <div className={style.mailRowRightTop}></div>
                <div className={style.mailRowRightBottom}></div>
            </div>
        </div>
    );
};
