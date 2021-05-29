import * as React from "react";
import { MailRow } from "../../molecules/MailRow";
import style from "./index.module.css";

export const AllMails = () => {
    return (
        <ul className={style.allMailUl}>
            {new Array(20).fill("_").map((row, index) => (
                <li key={index} className={style.allMailLi}>
                    <MailRow
                        subject="Welcome to the board"
                        from={{ address: "useremail", name: "Akanbi name" }}
                        date=""
                    />
                </li>
            ))}
        </ul>
    );
};
