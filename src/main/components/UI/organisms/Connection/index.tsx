import * as React from "react";
import { Input } from "../../atoms/Input";
import style from "./index.module.css";

const encryptionOptions = [
    { label: "STARTTLS", disabledAt: ["POP3"] },
    { label: "SSL/TLS", disabledAt: [] },
    { label: "Unencrypted", disabledAt: [] },
];

const serverOptions = [
    { label: "IMAP", disabledAt: [] },
    { label: "POP3", disabledAt: ["STARTTLS"] },
];

const formOptions = [
    { label: "server", disabled: true, type: "string" },
    { label: "port", disabled: true, type: "string" },
    { label: "username", disabled: false, type: "string" },
    { label: "password", disabled: false, type: "passsword" },
];

export const Connection = () => {
    const [appState, setAppState] = React.useState<{ [key: string]: string }>({
        username: "",
        password: "",
        serverType: "",
        encryption: "",
    });

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
                    >
                        {serverOptions.map((server) => (
                            <option
                                disabled={server.disabledAt.includes(
                                    appState.encryption
                                )}
                                value={server.label}
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
                    >
                        {encryptionOptions.map((encType) => (
                            <option
                                disabled={encType.disabledAt.includes(
                                    appState.serverType
                                )}
                                value={encType.label}
                            >
                                {encType.label}
                            </option>
                        ))}
                    </select>
                </div>

                {formOptions.slice(2).map((props) => (
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
                    />
                ))}
            </div>
        </section>
    );
};
