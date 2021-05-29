import actionTypes from "../actionTypes";
import { specificMail as initialState } from "../index";
import {
    FetchSpecificMailActionTypeDefs,
    FetchSpecificMailStateDef,
} from "../types";

const fetchSpecificMailTypes = [...actionTypes];

export const fetchSpecificMailReducer = (
    state = initialState,
    FetchSpecificMailProps: FetchSpecificMailActionTypeDefs
): FetchSpecificMailStateDef => {
    return fetchSpecificMailTypes.includes(FetchSpecificMailProps.type)
        ? { ...state, ...FetchSpecificMailProps.payload }
        : state;
};
