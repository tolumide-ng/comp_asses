import actionTypes from "../actionTypes";
import { allMails as initialState } from "../index";
import { FetchAllMailsActionTypeDefs, FetchAllMailsStateDef } from "../types";

const fetchAllMailsTypes = [...actionTypes];

export const fetchAllMailsReducer = (
    state = initialState,
    FetchAllMailsProps: FetchAllMailsActionTypeDefs
): FetchAllMailsStateDef => {
    return fetchAllMailsTypes.includes(FetchAllMailsProps.type)
        ? { ...state, ...FetchAllMailsProps.payload }
        : state;
};
