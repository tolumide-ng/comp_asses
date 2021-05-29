import * as React from "react";
import { Connection } from "../../UI/atoms/organisms/Connection";
import style from "./index.module.css";

export const LandingPage = () => {
    const [displaySpecific, setDisplaySpecific] = React.useState(false);

    return (
        <article className={style.homeCont}>
            <div className={style.home}>
                <div className={`${style.homeLeft} ${style.homeChild}`}>
                    <div className={style.homeleftTop}>
                        <Connection />
                    </div>
                    <div className={style.homeLeftBottom}></div>
                </div>
                <div className={`${style.homeRight} ${style.homeChild}`}></div>
            </div>
        </article>
    );
};
