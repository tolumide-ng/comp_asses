import * as React from "react";
import { appStatusText } from "../../../../utilities/reusables";
import { EmptyMail } from "../../molecules/EmptyMail";
import { LoadingContainer } from "../../molecules/LoadingContainer";
import { AllMails } from "../../organisms/AllMails";
import style from "./index.module.css";

interface AllMailsTempDef {
    allMails: [];
    allMailsStatus: string;
}

export const AllMailsTemp = (props: AllMailsTempDef) => {
    return (
        <div className={`${style.allMailTmp} container`}>
            {/* {props.allMails?.length === 0 &&
            props.allMailsStatus !== "fetchAllMailsPending" ? (
                <EmptyMail text={appStatusText[props.allMailsStatus]} />
            ) : (
                <></>
            )}

            {props.allMailsStatus === "fetchAllMailsPending" ? (
                <LoadingContainer />
            ) : (
                <></>
            )} */}
            <AllMails />
        </div>
    );
};
