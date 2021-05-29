import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllMailsDef } from "../../../declarations";
import { fetchAllMailsAction } from "../../../store/modules/allMails/actions";
import { RootState } from "../../../store/modules/types";
import { useActionCall } from "../../../utilities/hooks/useActionCall";
import { Connection } from "../../UI/organisms/Connection";
import style from "./index.module.css";

export const LandingPage = () => {
    const [appState, setAppState] = React.useState({
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
        if (!props.email || !props.password) {
            console.log("THERE WAS AN ERROR");
            return setAppState((prevState) => ({
                ...prevState,
                error: "Email and Password is required",
            }));
        }

        setAppState({ allMails: [], specificMail: {}, error: "" });

        console.log("NOW THAT I AM HERE");

        useActionCall({
            dispatch,
            requestFunc: fetchAllMailsAction,
            method: "GET",
            path: "all",
            payload: {
                email: props.email,
                password: props.password,
                encType: props.encType,
                serverType: props.serverType,
            },
        });
    };

    const handleSpecificMail = () => {};

    React.useEffect(() => {
        if (allMailsSelector.status === "success") {
            console.log("DATA IS BACK NOW>>>>>>>>>>>>>>>>");
            setAppState((prevState) => ({
                ...prevState,
                allMails: allMailsSelector.allMails,
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
                            loading={allMailsSelector.status === "loading"}
                            error={appState.error}
                        />
                    </div>
                    <div className={style.homeLeftBottom}></div>
                </div>
                <div className={`${style.homeRight} ${style.homeChild}`}></div>
            </div>
        </article>
    );
};
