import * as React from "react";
import { Input } from "../../atoms/Input";
import style from "./index.module.css";
import { hostDict, portNumber } from "../../../../utilities/ports";

const encryptionOptions = [
    { label: "SSL/TLS", disabledAt: [] },
    { label: "Unencrypted", disabledAt: [] },
    { label: "STARTTLS", disabledAt: ["POP3"] },
];

const serverOptions = [
    { label: "IMAP", disabledAt: [] },
    { label: "POP3", disabledAt: ["STARTTLS"] },
];

const formOptions = [
    { label: "server", disabled: true, type: "string" },
    { label: "port", disabled: true, type: "string" },
    { label: "username", disabled: false, type: "string" },
    { label: "password", disabled: false, type: "password" },
];

const getPort = (serverType: string, encryption: string): string => {
    return portNumber[serverType][encryption];
};

const getHost = (serverType: string) => {
    return hostDict[serverType];
};

const defaultConfig = {
    serverType: serverOptions[0].label,
    encType: encryptionOptions[0].label,
};

export const Connection = () => {
    const [appState, setAppState] = React.useState<{ [key: string]: string }>({
        username: "",
        password: "",
        serverType: defaultConfig.serverType,
        encryption: defaultConfig.encType,
        server: getHost(defaultConfig.serverType),
        port: getPort(defaultConfig.serverType, defaultConfig.encType),
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setAppState((prevAppState) => ({ ...prevAppState, [name]: value }));
    };

    React.useEffect(() => {
        const newServer = getHost(appState.serverType);
        const newPort = getPort(appState.serverType, appState.encryption);

        setAppState((prevAppState) => ({
            ...prevAppState,
            port: newPort,
            server: newServer,
        }));
    }, [appState.encryption, appState.serverType]);

    return (
        <section className={style.connect}>
            <div className={style.connectLeft}>
                <div className={style.connectInputCont}>
                    <label htmlFor="serverType" className={style.connectLabel}>
                        Server Type
                    </label>
                    <select
                        name="serverType"
                        id=""
                        className={style.connectInput}
                        onChange={handleChange}
                    >
                        {serverOptions.map((server) => (
                            <option
                                disabled={server.disabledAt.includes(
                                    appState.encryption
                                )}
                                value={server.label}
                                key={server.label}
                            >
                                {server.label}
                            </option>
                        ))}
                    </select>
                </div>

                {formOptions.slice(0, 2).map((props) => (
                    <Input
                        inputContClass={style.connectInputCont}
                        inputClass={style.connectInput}
                        inputLabelClass={style.connectLabel}
                        inputLabel={props.label}
                        inputType={props.type}
                        inputName={props.label}
                        inputDisabled={props.disabled}
                        inputValue={appState[props.label]}
                        key={props.label}
                        onChange={handleChange}
                        inputRequired={true}
                    />
                ))}
            </div>

            <div className={style.connectRight}>
                <div className={style.connectInputCont}>
                    <label htmlFor="encryption" className={style.connectLabel}>
                        Encryption
                    </label>
                    <select
                        name="encryption"
                        id=""
                        className={style.connectInput}
                        onChange={handleChange}
                    >
                        {encryptionOptions.map((encType) => (
                            <option
                                disabled={encType.disabledAt.includes(
                                    appState.serverType
                                )}
                                key={encType.label}
                                value={encType.label}
                            >
                                {encType.label}
                            </option>
                        ))}
                    </select>
                </div>

                {formOptions.slice(2).map((props) => (
                    <Input
                        key={props.label}
                        inputContClass={style.connectInputCont}
                        inputClass={style.connectInput}
                        inputLabelClass={style.connectLabel}
                        inputLabel={props.label}
                        inputType={props.type}
                        inputName={props.label}
                        inputDisabled={props.disabled}
                        inputValue={appState[props.label]}
                        onChange={handleChange}
                        inputRequired={true}
                    />
                ))}
            </div>
        </section>
    );
};
