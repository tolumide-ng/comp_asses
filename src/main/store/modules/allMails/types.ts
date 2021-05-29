import {
    FETCH_ALL_MAILS_FAILURE,
    FETCH_ALL_MAILS_PENDING,
    FETCH_ALL_MAILS_SUCCESS,
} from "./actionTypes";

export interface FetchAllMailsStateDef {
    readonly error: string | null;
    readonly status: string;
    readonly allMails: [];
}

export interface FetchAllMailsPendingActionDef {
    type: typeof FETCH_ALL_MAILS_PENDING;
    payload: FetchAllMailsStateDef;
}

export interface FetchAllMailsFailureActionDef {
    type: typeof FETCH_ALL_MAILS_FAILURE;
    payload: FetchAllMailsStateDef;
}

export interface FetchAllMailsSuccessActionDef {
    type: typeof FETCH_ALL_MAILS_SUCCESS;
    payload: FetchAllMailsStateDef;
}

export type FetchAllMailsActionTypeDefs =
    | FetchAllMailsSuccessActionDef
    | FetchAllMailsFailureActionDef
    | FetchAllMailsPendingActionDef;
