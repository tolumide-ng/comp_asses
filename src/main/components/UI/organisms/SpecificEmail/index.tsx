import * as React from "react";
import { Initials } from "../../atoms/Initials";
import style from "./index.module.css";
import { SpecificMailResponseDef } from "../../../../declarations";
import { Button } from "../../atoms/Button";

interface SpecificEmailDef extends SpecificMailResponseDef {}

export const SpecificEmail = () => {
    return (
        <article className={style.specEm}>
            <div className={style.specEmHead}>
                <h1 className={style.specEmSubject}>
                    My Email that is received
                </h1>
            </div>
            <div className={style.specEmBody}>
                <div className={style.specEmInfos}>
                    <div className={style.specEmLeft}>
                        <div className={style.specEmInitials}>
                            <Initials name="Ayo B" />
                        </div>

                        <div className={style.specEmBasics}>
                            <p className={style.specEmSenderName}>
                                email Sender
                            </p>

                            <p className={style.specEmSenderEmail}>
                                emailSender@sender
                            </p>

                            <p className={style.specEmDate}>date</p>
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
            </div>
        </article>
    );
};
