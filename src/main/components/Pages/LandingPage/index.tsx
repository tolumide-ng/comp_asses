import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    AllSpecificMailsDef,
    GetAllMailsDef,
    SpecificMailResponseDef,
} from "../../../declarations";
import { fetchAllMailsAction } from "../../../store/modules/allMails/actions";
import { RootState } from "../../../store/modules/types";
import { useActionCall } from "../../../utilities/hooks/useActionCall";
import { isEmailValid } from "../../../utilities/validators";
import { Connection } from "../../UI/organisms/Connection";
import style from "./index.module.css";
import { AllMailsTemp } from "../../UI/template/AllMailsTemp";
import { SpecificEmail } from "../../UI/organisms/SpecificEmail";
import { fetchSpecificMailAction } from "../../../store/modules/specificMail/actions";
import { SpecificMailTemp } from "../../UI/template/SpecificMailTemp";

// HANDLE EMPTY EMAILS SCENARIO

interface AppStateDef {
    allMails: Array<AllSpecificMailsDef>;
    specificMail: SpecificMailResponseDef | null;
    error: string;
    config: {
        encType: string;
        serverType: string;
    };
}

export const LandingPage = () => {
    const [appState, setAppState] = React.useState<AppStateDef>({
        allMails: [],
        specificMail: null,
        error: "",
        config: {
            encType: "",
            serverType: "",
        },
    });

    const [displaySpecific, setDisplaySpcific] = React.useState(false);

    const dispatch = useDispatch();

    const allMailsSelector = useSelector(
        (state: RootState) => state.fetchAllMailsReducer
    );

    const specificMailSelector = useSelector(
        (state: RootState) => state.fetchSpecificMailReducer
    );

    const handleAllMails = (props: GetAllMailsDef) => {
        console.log("ALL THE RECEIVED PROPS", props);

        setDisplaySpcific(false);

        if (!props.email || !props.password || !isEmailValid(props.email)) {
            console.log("THERE WAS AN ERROR");
            return setAppState((prevState) => ({
                ...prevState,
                error: "Valid Email and Password is required",
            }));
        }

        setAppState({
            allMails: [],
            specificMail: null,
            error: "",
            config: {
                encType: props.encType,
                serverType: props.serverType,
            },
        });

        console.log("NOW THAT I AM HERE", props.encType);

        useActionCall({
            dispatch,
            requestFunc: fetchAllMailsAction,
            method: "POST",
            path: "all",
            payload: {
                email: props.email,
                password: props.password,
                encType: props.encType,
                serverType: props.serverType,
            },
        });
    };

    const handleGoBack = () => setDisplaySpcific(false);

    const handleSpecificMail = (index: number) => {
        const { encType, serverType } = appState.config;
        const userKey = allMailsSelector.allMails.keys;

        setAppState((prevState) => ({ ...prevState, specificMail: null }));
        setDisplaySpcific(true);

        useActionCall({
            dispatch,
            requestFunc: fetchSpecificMailAction,
            method: "POST",
            path: `one/${index}`,
            payload: {
                encType,
                serverType,
            },
            userKey,
        });
    };

    React.useEffect(() => {
        if (allMailsSelector.status === "fetchAllMailsSuccess") {
            console.log(
                "WHAT WAS RECEIVED FROM THE BACKEND >>>>>>>>>>>>>",
                allMailsSelector.allMails.data
            );

            setAppState((prevState) => ({
                ...prevState,
                allMails: allMailsSelector.allMails.data,
            }));
        }

        if (allMailsSelector.status === "fetchAllMailsFailure") {
            console.log("the errors>>>>>", allMailsSelector.error);
            setAppState((prevState) => ({
                ...prevState,
                error: allMailsSelector.error ?? "",
            }));
        }
    }, [allMailsSelector.status]);

    React.useEffect(() => {
        if (specificMailSelector.status === "fetchSpecificMailSuccess") {
            console.log("THE STATE", specificMailSelector.specificMail);
            setAppState((prevState) => ({
                ...prevState,
                specificMail: specificMailSelector.specificMail,
            }));
        }

        if (specificMailSelector.status === "fetchSpecificMailPending") {
            setAppState((prevState) => ({
                ...prevState,
                error: specificMailSelector.error ?? "",
            }));
        }
    }, [specificMailSelector.status]);

    const homeRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (homeRef?.current) {
            homeRef.current.style.setProperty(
                "--home-display-all",
                displaySpecific ? "none" : "flex"
            );
            homeRef.current.style.setProperty(
                "--home-display-specific",
                displaySpecific ? "flex" : "none"
            );
        }
    }, [displaySpecific]);

    return (
        <article className={style.homeCont}>
            <div className={style.home} ref={homeRef}>
                <div className={`${style.homeLeft} ${style.homeChild}`}>
                    <div className={style.homeleftTop}>
                        <Connection
                            handleAllMails={handleAllMails}
                            loading={
                                allMailsSelector.status ===
                                "fetchAllMailsPending"
                            }
                            error={appState.error}
                        />
                    </div>
                    <div className={style.homeLeftBottom}>
                        <SpecificMailTemp
                            data={appState.specificMail}
                            status={specificMailSelector.status}
                            displayClass={style.homeSpecific}
                            handleGoBack={handleGoBack}
                        />
                        <div
                            className={`${style.homeMailsMob} ${
                                allMailsSelector.status !==
                                    "fetchAllMailsSuccess" &&
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
