import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AllSpecificMailsDef, GetAllMailsDef } from "../../../declarations";
import { fetchAllMailsAction } from "../../../store/modules/allMails/actions";
import { RootState } from "../../../store/modules/types";
import { useActionCall } from "../../../utilities/hooks/useActionCall";
import { isEmailValid } from "../../../utilities/validators";
import { EmptyMail } from "../../UI/molecules/EmptyMail";
import { Connection } from "../../UI/organisms/Connection";
import { appStatusText } from "../../../utilities/reusables";
import style from "./index.module.css";
import { LoadingContainer } from "../../UI/molecules/LoadingContainer";
import { AllMailsTemp } from "../../UI/template/AllMailsTemp";

// HANDLE EMPTY EMAILS SCENARIO

interface AppStateDef {
    allMails: Array<AllSpecificMailsDef>;
    specificMail: {};
    error: string;
}

export const LandingPage = () => {
    const [appState, setAppState] = React.useState<AppStateDef>({
        allMails: [],
        specificMail: {},
        error: "",
    });

    const dispatch = useDispatch();

    const allMailsSelector = useSelector(
        (state: RootState) => state.fetchAllMailsReducer
    );

    const handleAllMails = (props: GetAllMailsDef) => {
        console.log("ALL THE RECEIVED PROPS", props);
        if (!props.email || !props.password || !isEmailValid(props.email)) {
            console.log("THERE WAS AN ERROR");
            return setAppState((prevState) => ({
                ...prevState,
                error: "Valid Email and Password is required",
            }));
        }

        setAppState({ allMails: [], specificMail: {}, error: "" });

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

    const handleSpecificMail = (index: number) => {};

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

    return (
        <article className={style.homeCont}>
            <div className={style.home}>
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
                        <div className={style.homeMailsMob}>
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
