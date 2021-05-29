import { combineReducers } from "redux";
import { dropDownReducer } from "./dropDown/reducer";
import { fetchAllMailsReducer } from "./allMails/reducer";

export const rootReducer = combineReducers({
    dropDownReducer,
    fetchAllMailsReducer,
});

export type RootStateDef = ReturnType<typeof rootReducer>;

export default rootReducer;
