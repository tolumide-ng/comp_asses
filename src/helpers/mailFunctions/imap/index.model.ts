import { EncryptionType } from "../index.model";

export interface ImapFuncDef {
    encryption: EncryptionType;
    email: string;
    password: string;
}
