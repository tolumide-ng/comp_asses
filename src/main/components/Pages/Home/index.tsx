import * as React from "react";
import { Connection } from "../../UI/organisms/Connection";
import style from "./index.module.css";
import { AllMailsTemp } from "../../UI/template/AllMailsTemp";
import { SpecificMailTemp } from "../../UI/template/SpecificMailTemp";
import { useAppLogic } from "./useAppLogic";

export const HomePage = () => {
    const {
        homeRef,
        handleAllMails,
        allMailsSelector,
        appState,
        specificMailSelector,
        handleSpecificMail,
        handleGoBack,
    } = useAppLogic();

    return (
        <article className={style.homeCont}>
            <div className={style.home} ref={homeRef}>
                <div className={`${style.homeLeft} ${style.homeChild}`}>
                    <div className={style.homeleftTop}>
                        <Connection
                            handleAllMails={handleAllMails}
                            loading={allMailsSelector.status === "loading"}
                            error={appState.error}
                        />
                    </div>
                    <div className={style.homeLeftBottom}>
                        <SpecificMailTemp
                            data={appState.specificMail}
                            status={specificMailSelector.status}
                            displayClass={style.homeSpecific}
                            handleGoBack={handleGoBack}
                            allMailsStatus={allMailsSelector.status}
                        />
                        <div
                            className={`${style.homeMailsMob} ${
                                allMailsSelector.status !== "success" &&
                                style.homeMailsMobLoading
                            }`}
                        >
                            <AllMailsTemp
                                allMails={appState.allMails}
                                allMailsStatus={allMailsSelector.status}
                                handleSpecificMail={handleSpecificMail}
                            />
                        </div>
                    </div>
                </div>
                <div className={`${style.homeRight} ${style.homeChild}`}>
                    <AllMailsTemp
                        allMails={appState.allMails}
                        allMailsStatus={allMailsSelector.status}
                        handleSpecificMail={handleSpecificMail}
                    />
                </div>
            </div>
        </article>
    );
};
