import React from "react";
import style from "style/components/hand.module.scss";

export default function Hand({ type = "rock", left }) {
    return (
        <div className={style.hand}>
            <img className={[left ? style.playerOne : style.playerTwo, style.image].join(" ")}
                src={`/images/${type}.png`} />
        </div>
    );
}