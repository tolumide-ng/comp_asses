import { combineReducers } from "redux";
import { dropDownReducer } from "./dropDown/reducer";
import { fetchAllMailsReducer } from "./allMails/reducer";
import { fetchSpecificMailReducer } from "./specificMail/reducer";

export const rootReducer = combineReducers({
    dropDownReducer,
    fetchAllMailsReducer,
    fetchSpecificMailReducer,
});

export type RootStateDef = ReturnType<typeof rootReducer>;

export default rootReducer;
