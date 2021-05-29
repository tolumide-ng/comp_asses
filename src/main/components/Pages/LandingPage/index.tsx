import * as React from "react";
import style from "./index.module.css";

export const LandingPage = () => {
    return (
        <article className="ldpg">
            <article className="ldpg-cont"></article>

            <table
                className={style.frontPageSettingsTable}
                width="100%"
                // height="100%"
            >
                <tr>
                    <td valign="top">
                        <table
                            className={style.frontPageSettingsTableInner}
                            width="100%"
                        >
                            <tr>
                                <td>Server type</td>
                                <td align="right">
                                    <select />
                                </td>
                                <td>Encryption</td>
                                <td align="right">
                                    <select></select>
                                </td>
                            </tr>
                            <tr>
                                <td>Server</td>
                                <td align="right">
                                    <input type="text" value="imap.gmx.com" />
                                </td>
                                <td>Username</td>
                                <td align="right">
                                    <input type="text" value="" />
                                </td>
                            </tr>
                            <tr>
                                <td>Port</td>
                                <td align="right">
                                    <input type="text" value="993" />
                                </td>
                                <td>Password</td>
                                <td align="right">
                                    <input type="text" value="" />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={5} align="right">
                                    <input type="button" value="Start" />
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td
                        rowSpan={2}
                        width="600px"
                        height="800 px"
                        className={style.frontMessageBody}
                    >
                        Body should go here
                    </td>
                </tr>
                <tr>
                    <td className={style.frontMessageListTd}>
                        Messages should go here
                    </td>
                </tr>
            </table>
        </article>
    );
};
