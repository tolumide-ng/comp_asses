import * as React from "react";
import style from "./index.module.css";

export const LandingPage = () => {
    return (
        <article className={style.homeCont}>
            <div className={style.home}>
                <div className={`${style.homeLeft} ${style.homeChild}`}>
                    <div className={style.homeleftTop}></div>
                    <div className={style.homeLeftBottom}></div>
                </div>
                <div className={`${style.homeRight} ${style.homeChild}`}></div>
            </div>
        </article>
    );
};
