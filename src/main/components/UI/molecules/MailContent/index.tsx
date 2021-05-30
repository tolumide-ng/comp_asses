import * as React from "react";
import style from "./index.module.css";

interface MailContentDef {
    content: string;
}

// sbfulpzkumdwgmaj
// npm i html-react-parser

function htmlDecode(input: string) {
    var e = document.createElement("div");
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

export const MailContent = (props: MailContentDef) => {
    const divRef = React.useRef<HTMLDivElement>(null);

    return (
        <div className={style.mailC}>
            <div
                className=""
                ref={divRef}
                dangerouslySetInnerHTML={{
                    __html: htmlDecode(props.content) ?? "",
                }}
            ></div>
        </div>
    );
};
