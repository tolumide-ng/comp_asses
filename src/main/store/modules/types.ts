import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootStateDef } from ".";
import { ForAxiosDefs } from "../../commonTypes";
import { AllMailsResponseDef } from "../../declarations";

export interface RootState {
    dropDownReducer: {
        display: boolean;
    };
    fetchAllMailsReducer: {
        status: string;
        error: string | null;
        allMails: AllMailsResponseDef;
    };
}

export interface StoreActionPropsDefs {
    path: string;
    payload: {};
    method: ForAxiosDefs;
    params?: {};
}

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootStateDef,
    unknown,
    Action<string>
>;
