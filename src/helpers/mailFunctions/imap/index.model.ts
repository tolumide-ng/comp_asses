import { Response } from "express";
import { EncryptionTypeDef } from "../";

export interface GetImapInboxDef {
    email: string;
    password: string;
    encType: EncryptionTypeDef;
    erroHandler: (error: {
        message: string;
    }) => Response<any, Record<string, any>> | undefined;
}
