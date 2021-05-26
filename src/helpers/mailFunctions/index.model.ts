export type EncryptionTypeDef = "Unencrypted" | "SSL/TLS" | "STARTTLS";

export type ServerTypeDef = "POP3" | "IMAP";

export interface MailFuncDef {
    encryption: EncryptionTypeDef;
    email: string;
    password: string;
    serverType: ServerTypeDef;
}
