import { hostDict, portNumber } from "../../../../utilities/ports";

export const encryptionOptions = [
    { label: "SSL/TLS", disabledAt: [] },
    { label: "Unencrypted", disabledAt: [] },
    { label: "STARTTLS", disabledAt: ["POP3"] },
];

export const serverOptions = [
    { label: "IMAP", disabledAt: [] },
    { label: "POP3", disabledAt: ["STARTTLS"] },
];

export const formOptions = [
    { label: "server", disabled: true, type: "string" },
    { label: "port", disabled: true, type: "string" },
    { label: "username", disabled: false, type: "string" },
    { label: "password", disabled: false, type: "password" },
];

export const getPort = (serverType: string, encryption: string): string => {
    return portNumber[serverType][encryption];
};

export const getHost = (serverType: string) => {
    return hostDict[serverType];
};

export const defaultConfig = {
    serverType: serverOptions[0].label,
    encType: encryptionOptions[0].label,
};
