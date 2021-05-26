export type EncryptionTypeDef = "Unencrypted" | "SSL/TLS" | "STARTTLS";

export type ServerTypeDef = "POP3" | "IMAP";

export type PortTypeDef = 993 | 143 | 110 | 995;

export interface MailFuncDef {
    encryption: EncryptionTypeDef;
    email: string;
    password: string;
    serverType: ServerTypeDef;
}
