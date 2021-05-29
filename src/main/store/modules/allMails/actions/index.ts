import { axiosCall } from "../../../../utilities/helpers/axiosCall";
import { AppThunk, StoreActionPropsDefs } from "../../types";
import {
    FETCH_ALL_MAILS_FAILURE,
    FETCH_ALL_MAILS_PENDING,
    FETCH_ALL_MAILS_SUCCESS,
} from "../actionTypes";

export const fetchAllMailsPending = () => ({
    type: FETCH_ALL_MAILS_PENDING,
    payload: {
        status: "fetchAllMailsPending",
        error: null,
        allMails: [],
    },
});

export const fetchAllMailsFailure = (error: string) => ({
    type: FETCH_ALL_MAILS_FAILURE,
    payload: {
        status: "fetchAllMailsFailure",
        error,
        allMails: [],
    },
});

export const fetchAllMailsSuccess = (allMails: []) => ({
    type: FETCH_ALL_MAILS_SUCCESS,
    payload: {
        status: "fetchAllMailsSuccess",
        error: null,
        allMails,
    },
});

export const fetchAllMailsAction =
    (props: StoreActionPropsDefs): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(fetchAllMailsPending());
            const response = await axiosCall(props);
            dispatch(fetchAllMailsSuccess(response?.data));
        } catch (error) {
            dispatch(fetchAllMailsFailure(error));
        }
    };
