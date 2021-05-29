import {
    FETCH_SPECIFIC_MAIL_FAILURE,
    FETCH_SPECIFIC_MAIL_PENDING,
    FETCH_SPECIFIC_MAIL_SUCCESS,
} from "./actionTypes";

export interface FetchSpecificMailStateDef {
    readonly error: string | null;
    readonly status: string;
    readonly specificMail: {};
}

export interface FetchSpecificMailPendingActionDef {
    type: typeof FETCH_SPECIFIC_MAIL_PENDING;
    payload: FetchSpecificMailStateDef;
}

export interface FetchSpecificMailFailureActionDef {
    type: typeof FETCH_SPECIFIC_MAIL_FAILURE;
    payload: FetchSpecificMailStateDef;
}

export interface FetchSpecificMailSuccessActionDef {
    type: typeof FETCH_SPECIFIC_MAIL_SUCCESS;
    payload: FetchSpecificMailStateDef;
}

export type FetchSpecificMailActionTypeDefs =
    | FetchSpecificMailPendingActionDef
    | FetchSpecificMailFailureActionDef
    | FetchSpecificMailSuccessActionDef;
