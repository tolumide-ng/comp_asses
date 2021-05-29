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


