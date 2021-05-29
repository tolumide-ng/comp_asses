import * as React from "react";
import { AllSpecificMailsDef } from "../../../../declarations";
import { appStatusText } from "../../../../utilities/reusables";
import { EmptyMail } from "../../molecules/EmptyMail";
import { LoadingContainer } from "../../molecules/LoadingContainer";
import { AllMails } from "../../organisms/AllMails";
import style from "./index.module.css";

interface AllMailsTempDef {
    allMails: Array<AllSpecificMailsDef>;
    allMailsStatus: string;
    handleSpecificMail: (index: number) => void;
}

export const AllMailsTemp = (props: AllMailsTempDef) => {
    return (
        <div className={`${style.allMailTmp} container`}>
            {props.allMails?.length === 0 &&
            props.allMailsStatus !== "fetchAllMailsPending" ? (
                <EmptyMail text={appStatusText[props.allMailsStatus]} />
            ) : (
                <></>
            )}

            {props.allMailsStatus === "fetchAllMailsPending" ? (
                <LoadingContainer />
            ) : (
                <></>
            )}

            {props.allMailsStatus === "fetchAllMailsSuccess" &&
            props.allMails?.length ? (
                <AllMails
                    allMails={props.allMails}
                    handleSpecificMail={props.handleSpecificMail}
                />
            ) : (
                <></>
            )}
        </div>
    );
};
