import * as React from "react";
import {
    SpecificMailResponseDef,
    StatusTypeDef,
} from "../../../../declarations";
import { appStatusText } from "../../../../utilities/reusables";
import { EmptyMail } from "../../molecules/EmptyMail";
import { LoadingContainer } from "../../molecules/LoadingContainer";
import { SpecificEmail } from "../../organisms/SpecificEmail";
import style from "./index.module.css";

interface SpecificMailTempDef {
    data: SpecificMailResponseDef | null;
    status: StatusTypeDef;
    displayClass: string;
    handleGoBack: () => void;
    allMailsStatus: StatusTypeDef;
}

export const SpecificMailTemp = (props: SpecificMailTempDef) => {
    return (
        <div
            className={`${props.displayClass} ${style.specMail}`}
            aria-label="view email"
        >
            {props.status === "success" && props.data ? (
                <SpecificEmail
                    subject={props?.data?.subject ?? ""}
                    date={props?.data?.date ?? ""}
                    html={props?.data?.html ?? ""}
                    messagedId={props.data?.messagedId ?? ""}
                    to={props.data?.to ?? ""}
                    from={props.data?.from ?? ""}
                    handleGoBack={props.handleGoBack}
                />
            ) : (
                <></>
            )}
            {[props.status, props.allMailsStatus].includes("loading") ? (
                <LoadingContainer />
            ) : (
                <></>
            )}
            {props.status === "rest" && props.allMailsStatus !== "loading" ? (
                <EmptyMail
                    text={
                        appStatusText[`${props.status}-${props.allMailsStatus}`]
                    }
                />
            ) : (
                <></>
            )}
        </div>
    );
};
