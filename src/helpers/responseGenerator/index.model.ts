import { UserInfoDef } from "../keyCrypt";

export interface StatusCodeDef {
    [key: number]: string;
}

export declare namespace Express {
    export interface Request {
        userInfo: UserInfoDef;
    }
}
