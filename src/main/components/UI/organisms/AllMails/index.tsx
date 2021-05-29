import * as React from "react";
import { MailRow } from "../../molecules/MailRow";
import style from "./index.module.css";
import { AllSpecificMailsDef } from "../../../../declarations";

interface AllMailsDef {
    allMails: Array<AllSpecificMailsDef>;
    handleSpecificMail: (index: number) => void;
}

export const AllMails = (props: AllMailsDef) => {
    return (
        <ul className={style.allMailUl}>
            {props.allMails.map((mail, index) => (
                <li key={index} className={style.allMailLi}>
                    <MailRow
                        subject={mail.subject}
                        from={mail.from}
                        date={mail.date}
                        index={index + 1}
                        handleSpecificMail={props.handleSpecificMail}
                    />
                </li>
            ))}
        </ul>
    );
};
