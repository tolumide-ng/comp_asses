import * as React from "react";
import style from "./index.module.css";

interface AppLoaderDef {
    size: "small" | "big";
    context: "light" | "dark";
}

export const AppLoader = (props: AppLoaderDef) => {
    return (
        <div
            className={`${style.asm} ${
                props.size === "small" ? style.asmSmall : style.asmBig
            }`}
        >
            <div
                className={`${style.asmChild} ${
                    props.context === "light"
                        ? style.asmChildDark
                        : style.asmChildLight
                } ${
                    props.size === "small"
                        ? style.asmChildSmall
                        : style.asmChildBig
                }
                
                    `}
            ></div>
            <div
                className={`${style.asmChild} ${
                    props.context === "light"
                        ? style.asmChildDark
                        : style.asmChildLight
                } ${
                    props.size === "small"
                        ? style.asmChildSmall
                        : style.asmChildBig
                }
            
                `}
            ></div>
            <div
                className={`${style.asmChild} ${
                    props.context === "light"
                        ? style.asmChildDark
                        : style.asmChildLight
                } ${
                    props.size === "small"
                        ? style.asmChildSmall
                        : style.asmChildBig
                }
            
                `}
            ></div>
            <div
                className={`${style.asmChild} ${
                    props.context === "light"
                        ? style.asmChildDark
                        : style.asmChildLight
                } ${
                    props.size === "small"
                        ? style.asmChildSmall
                        : style.asmChildBig
                }
            
                `}
            ></div>
        </div>
    );
};
