import * as React from "react";
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
                <div className="">
                    <label htmlFor="serverType">Server Type</label>
                    <select name="serverType" id="">
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

                {formOptions.slice(0, 2).map((input) => (
                    <div className="" key={input.label}>
                        <label htmlFor="">{input.label}</label>
                        <input
                            type={input.type}
                            disabled={input.disabled}
                            value={appState[input.label]}
                        />
                    </div>
                ))}
            </div>

            <div className={style.connectRight}>
                <div className="">
                    <label htmlFor="encryption">Encryption</label>
                    <select name="encryption" id="">
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

                {formOptions.slice(2).map((input) => (
                    <div className="" key={input.label}>
                        <label htmlFor="">{input.label}</label>
                        <input
                            type={input.type}
                            disabled={input.disabled}
                            value={appState[input.label]}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};
