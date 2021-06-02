import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    AllSpecificMailsDef,
    GetAllMailsDef,
    SpecificMailResponseDef,
} from "../../../declarations";
import { fetchAllMailsAction } from "../../../store/modules/allMails/actions";
import { fetchSpecificMailAction } from "../../../store/modules/specificMail/actions";
import { RootState } from "../../../store/modules/types";
import { useActionCall } from "../../../utilities/hooks/useActionCall";
import { isEmailValid } from "../../../utilities/validators";

interface AppStateDef {
    allMails: Array<AllSpecificMailsDef>;
    specificMail: SpecificMailResponseDef | null;
    error: string;
    config: {
        encType: string;
        serverType: string;
    };
}

export const useAppLogic = () => {
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

    const homeRef = React.useRef<HTMLDivElement>(null);

    const dispatch = useDispatch();

    const allMailsSelector = useSelector(
        (state: RootState) => state.fetchAllMailsReducer
    );

    const specificMailSelector = useSelector(
        (state: RootState) => state.fetchSpecificMailReducer
    );

    const handleAllMails = (props: GetAllMailsDef) => {
        setDisplaySpcific(false);

        if (!props.email || !props.password || !isEmailValid(props.email)) {
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
        if (allMailsSelector.status === "success") {
            setAppState((prevState) => ({
                ...prevState,
                allMails: allMailsSelector.allMails.data,
            }));
        }

        if (allMailsSelector.status === "failure") {
            setAppState((prevState) => ({
                ...prevState,
                error: allMailsSelector.error ?? "",
            }));
        }
    }, [allMailsSelector.status]);

    React.useEffect(() => {
        if (specificMailSelector.status === "success") {
            setAppState((prevState) => ({
                ...prevState,
                specificMail: specificMailSelector.specificMail,
            }));
        }

        if (specificMailSelector.status === "loading") {
            setAppState((prevState) => ({
                ...prevState,
                error: specificMailSelector.error ?? "",
            }));
        }
    }, [specificMailSelector.status]);

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

    return {
        homeRef,
        handleAllMails,
        allMailsSelector,
        appState,
        specificMailSelector,
        handleSpecificMail,
        handleGoBack,
    };
};
