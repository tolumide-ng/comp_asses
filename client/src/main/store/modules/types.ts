import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootStateDef } from ".";
import { ForAxiosDefs } from "../../commonTypes";
import {
    AllMailsResponseDef,
    SpecificMailResponseDef,
    StatusTypeDef,
} from "../../declarations";

export interface RootState {
    dropDownReducer: {
        display: boolean;
    };
    fetchAllMailsReducer: {
        status: StatusTypeDef;
        error: string | null;
        allMails: AllMailsResponseDef;
    };
    fetchSpecificMailReducer: {
        status: StatusTypeDef;
        error: string | null;
        specificMail: SpecificMailResponseDef;
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
