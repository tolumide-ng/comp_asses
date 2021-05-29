import * as React from "react";
import style from "./index.module.css";

interface InputProps {
    inputContClass: string;
    inputClass: string;
    inputLabelClass: string;
    inputLabel: string;
    inputType: string;
    inputName: string;
    inputDisabled: boolean;
    inputValue: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputRequired: boolean;
}

export const Input = (props: InputProps) => {
    return (
        <div className={props.inputContClass}>
            <label htmlFor={props.inputName} className={props.inputLabelClass}>
                {props.inputLabel}{" "}
            </label>
            <input
                onChange={props.onChange}
                type={props.inputType}
                disabled={props.inputDisabled}
                value={props.inputValue}
                className={props.inputClass}
                name={props.inputName}
                required={props.inputRequired}
            />
        </div>
    );
};
