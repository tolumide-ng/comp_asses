import * as React from "react";
import { AllSpecificMailsDef, StatusTypeDef } from "../../../../declarations";
import { appStatusText } from "../../../../utilities/reusables";
import { EmptyMail } from "../../molecules/EmptyMail";
import { LoadingContainer } from "../../molecules/LoadingContainer";
import { AllMails } from "../../organisms/AllMails";
import style from "./index.module.css";

interface AllMailsTempDef {
    allMails: Array<AllSpecificMailsDef>;
    allMailsStatus: StatusTypeDef;
    handleSpecificMail: (index: number) => void;
}

export const AllMailsTemp = (props: AllMailsTempDef) => {
    return (
        <div className={`${style.allMailTmp} container`} role="feed">
            {props.allMails?.length === 0 &&
            props.allMailsStatus !== "loading" ? (
                <EmptyMail text={appStatusText[props.allMailsStatus]} />
            ) : (
                <></>
            )}

            {props.allMailsStatus === "loading" ? <LoadingContainer /> : <></>}

            {props.allMailsStatus === "success" && props.allMails?.length ? (
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
