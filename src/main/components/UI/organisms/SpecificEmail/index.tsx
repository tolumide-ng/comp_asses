import * as React from "react";
import dayjs from "dayjs";
import { Initials } from "../../atoms/Initials";
import style from "./index.module.css";
import { SpecificMailResponseDef } from "../../../../declarations";
import { Button } from "../../atoms/Button";
import { MailContent } from "../../molecules/MailContent";

interface SpecificEmailDef extends SpecificMailResponseDef {}

export const SpecificEmail = (props: SpecificEmailDef) => {
    return (
        <article className={style.specEm}>
            <div className={style.specEmHead}>
                <h1 className={style.specEmSubject}>{props.subject}</h1>
            </div>
            <div className={style.specEmBody}>
                <div className={style.specEmInfos}>
                    <div className={style.specEmLeft}>
                        <div className={style.specEmInitials}>
                            <Initials name="Ayo B" />
                        </div>

                        <div className={style.specEmBasics}>
                            <p className={style.specEmSenderName}>
                                {props.from?.name ?? props.from}
                            </p>

                            {props?.from?.name ? (
                                <p className={style.specEmSenderEmail}>
                                    {props.from?.address}
                                </p>
                            ) : (
                                <></>
                            )}

                            <p className={style.specEmDate}>
                                {dayjs(props.date).format("MMMM D YYYY")}
                            </p>
                        </div>
                    </div>

                    <div className={style.specEmRight}>
                        {/*  must only be visible on mobile */}
                        <Button
                            buttonClass="appButton"
                            buttonText="Go Back"
                            buttonType="button"
                        />
                    </div>
                </div>

                <div className="">
                    <MailContent content={props.html} />
                </div>
            </div>
        </article>
    );
};
