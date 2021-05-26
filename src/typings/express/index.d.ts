import { UserInfoDef } from "../../helpers/keyCrypt";

declare module Express {
    export interface Request {
        userInfo: UserInfoDef;
    }
}
