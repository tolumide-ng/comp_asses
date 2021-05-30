import { AriaAttributes, DOMAttributes } from "react";

declare module "react" {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        tabIndex?: number;
        suggested?: string;
    }
}

export interface GetAllMailsDef {
    email: string;
    password: string;
    encType: string;
    serverType: string;
}

export interface GetSpecificMailDef extends GetAllMailsDef {
    mailKey: string;
}

export interface AllSpecificMailsDef {
    date: string | Date;
    subject: string;
    priority: string;
    from: MailSenderDef;
    messageId: string;
}

export interface MailSenderDef {
    address: string;
    name: string;
}

export interface AllMailsResponseDef {
    data: Array<AllSpecificMailsDef>;
    keys: string;
}

export interface SpecificMailResponseDef {
    html: string;
    subject: string;
    messagedId: string;
    from: MailSenderDef;
    to: MailSenderDef | string;
    date: string | Date;
}

export type StatusTypeDef = "rest" | "loading" | "success" | "failure";
