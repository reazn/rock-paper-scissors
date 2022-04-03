import React from "react";
import { Clipboard } from "components"
import style from "style/components/roomcode.module.scss";

export default function Roomcode({ code }) {

    return (
        <>
            {code ?
                <div className={style.roomcode} onClick={() => navigator.clipboard.writeText(code)}>
                    <span className={style.code}>{code}</span>
                    <Clipboard className={style.icon} />
                </div>
                : ""
            }
        </>
    );
}