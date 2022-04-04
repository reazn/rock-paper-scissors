import React from "react";
import { Clipboard } from "components"
import style from "style/components/roomcode.module.scss";

export default function Roomcode({ code }) {

    return (
        <>
            <div className={[style.roomcode, code ? style.active : ""].join(" ")} onClick={() => navigator.clipboard.writeText(code)}>
                <span className={style.code}>{code ? code : "error"}</span>
                <Clipboard className={style.icon} />
            </div>

        </>
    );
}