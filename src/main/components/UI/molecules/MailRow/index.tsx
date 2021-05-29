import * as React from "react";
import style from "./index.module.css";

interface MailRowDef {
    subject: string;
    date: Date | string;
    from: { name: string; address: string };
}

export const MailRow = () => {
    return (
        <div className="">
            <div className=""></div>
            <div className=""></div>
        </div>
    );
};
