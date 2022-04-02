import React from "react";
import style from "style/components/roomcode.module.scss";

export default function Roomcode({ code }) {

    return (
        <div className={style.roomcode}>
            <span className={style.code}>{code}</span>
        </div>
    );
}