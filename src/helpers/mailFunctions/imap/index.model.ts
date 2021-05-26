import { Response } from "express";
import { EncryptionTypeDef } from "../";
import { PortTypeDef } from "../index.model";

export interface GetImapInboxDef {
    email: string;
    password: string;
    encType: EncryptionTypeDef;
    port: PortTypeDef;
    erroHandler: (error: {
        message: string;
    }) => Response<any, Record<string, any>> | undefined;
}
