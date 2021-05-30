import * as React from "react";
import { GetAllMailsDef } from "../../../../declarations";
import { Button } from "../../atoms/Button";
import { Input } from "../../atoms/Input";
import style from "./index.module.css";
import {
    encryptionOptions,
    serverOptions,
    formOptions,
    getPort,
    getHost,
    defaultConfig,
} from "./index.utils";

interface ConnectionPropsDef {
    handleAllMails: (props: GetAllMailsDef) => void;
    loading: boolean;
    error: string | null;
}

export const Connection = (props: ConnectionPropsDef) => {
    const [config, setConfig] = React.useState<{ [key: string]: string }>({
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

        setConfig((prevConfig) => ({ ...prevConfig, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        e.persist();

        const {
            username: email,
            password,
            encryption: encType,
            serverType,
        } = config;

        props.handleAllMails({ email, password, encType, serverType });
    };

    React.useEffect(() => {
        const newServer = getHost(config.serverType);
        const newPort = getPort(config.serverType, config.encryption);

        setConfig((prevConfig) => ({
            ...prevConfig,
            port: newPort,
            server: newServer,
        }));
    }, [config.encryption, config.serverType]);

    return (
        <form onSubmit={handleSubmit}>
            <div className={style.connect}>
                <div className={style.connectLeft}>
                    <div className={style.connectInputCont}>
                        <label
                            htmlFor="serverType"
                            className={style.connectLabel}
                        >
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
                                        config.encryption
                                    )}
                                    value={server.label}
                                    key={server.label}
                                >
                                    {server.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {formOptions.slice(0, 2).map((theInput) => (
                        <Input
                            key={theInput.label}
                            inputContClass={style.connectInputCont}
                            inputClass={style.connectInput}
                            inputLabelClass={style.connectLabel}
                            inputLabel={theInput.label}
                            inputType={theInput.type}
                            inputName={theInput.label}
                            inputDisabled={theInput.disabled}
                            inputValue={config[theInput.label]}
                            onChange={handleChange}
                            inputRequired={true}
                        />
                    ))}
                </div>

                <div className={style.connectRight}>
                    <div className={style.connectInputCont}>
                        <label
                            htmlFor="encryption"
                            className={style.connectLabel}
                        >
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
                                        config.serverType
                                    )}
                                    key={encType.label}
                                    value={encType.label}
                                >
                                    {encType.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {formOptions.slice(2).map((theInput) => (
                        <Input
                            key={theInput.label}
                            inputContClass={style.connectInputCont}
                            inputClass={style.connectInput}
                            inputLabelClass={style.connectLabel}
                            inputLabel={theInput.label}
                            inputType={theInput.type}
                            inputName={theInput.label}
                            inputDisabled={theInput.disabled}
                            inputValue={config[theInput.label]}
                            onChange={handleChange}
                            inputRequired={true}
                        />
                    ))}
                </div>
            </div>
            <div className={style.connectButtonCont}>
                <p className={style.connectError}>{props.error}</p>
                <Button
                    buttonClass="appButton"
                    buttonText="Start"
                    buttonDisabled={props.loading}
                    handleClick={handleSubmit}
                    buttonType="submit"
                />
            </div>
        </form>
    );
};
