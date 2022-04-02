import React from "react";
import style from "style/components/hand.module.scss";

export default function Hand({ type = "rock", left, active, moving = false }) {

    let activeHand;

    if (left) {
        activeHand = style.activeLeft
    }

    if (!left) {
        activeHand = style.activeRight
    }

    return (
        <div className={style.hand}>
            <img className={[
                style.image,
                left ? style.playerOne : style.playerTwo,
                moving ? style.moving : "",
                active ? "" : activeHand,
            ].join(" ")}
                src={`/images/${type}.png`} />
        </div>
    );
}