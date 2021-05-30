import * as React from "react";
import style from "./index.module.css";

interface MailContentDef {
    content: string;
}

export const MailContent = (props: MailContentDef) => {
    const divRef = React.useRef<HTMLDivElement>(null);

    return (
        <article className={style.mailC}>
            <div
                className=""
                ref={divRef}
                dangerouslySetInnerHTML={{
                    __html: props.content,
                }}
            ></div>
        </article>
    );
};
