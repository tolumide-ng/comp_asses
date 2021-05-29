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
}

export const Input = (props: InputProps) => {
    return (
        <div className={props.inputContClass}>
            <label htmlFor={props.inputName} className={props.inputLabelClass}>
                {props.inputLabel}{" "}
            </label>
            <input
                type={props.inputType}
                disabled={props.inputDisabled}
                value={props.inputValue}
                className={props.inputClass}
            />
        </div>
    );
};
