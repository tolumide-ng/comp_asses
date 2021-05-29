import * as React from "react";
import { MailSenderDef } from "../../../../declarations";
import { Initials } from "../../atoms/Initials";
import style from "./index.module.css";
import dayjs from "dayjs";

interface MailRowDef {
    subject: string;
    date: Date | string;
    from: MailSenderDef;
    index: number;
    handleSpecificMail: (index: number) => void;
}

export const MailRow = (props: MailRowDef) => {
    return (
        <div
            className={style.mailRow}
            onClick={(_e) => props.handleSpecificMail(props.index)}
        >
            <div className={style.mailRowLeft}>
                <Initials name={props?.from?.name} />
            </div>
            <div className={style.mailRowRight}>
                <div className={style.mailRowSum}>
                    <div className={style.mailRowRightTop}>
                        <p className={style.mailRowName}>{props.from.name}</p>
                    </div>
                    <div className={style.mailRowRightBottom}>
                        <p className={style.mailRowSubject}>{props.subject}</p>
                    </div>
                </div>
                <div className={style.mailRowDateCont}>
                    <p className={style.mailRowDate}>
                        {dayjs(props.date).format("MMM D YYYY")}
                    </p>
                </div>
            </div>
        </div>
    );
};
