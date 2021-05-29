// export type PortTypeDef = 993 | 143 | 110 | 995;

export interface PortDictDef {
    [key: string]: {
        [key: string]: string;
    };
}

export const portNumber: PortDictDef = {
    IMAP: {
        "SSL/TLS": "993",
        STARTTLS: "993",
        Unencrypted: "143",
    },
    POP3: {
        "SSL/TLS": "995",
        Unencrypted: "110",
    },
};

export const hostDict: { [key: string]: string } = {
    POP3: "pop.mail.yahoo.com",
    IMAP: "imap.mail.yahoo.com",
};
