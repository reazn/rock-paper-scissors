import React from "react";
import style from "style/components/hand.module.scss";

export default function Hand({ type = "rock", left, color = "yellow", active, moving = false }) {

    let activeHand = left ? style.activeLeft : style.activeRight;

    return (
        <div className={style.hand}>
            <img className={[
                style.image,
                left ? style.playerOne : style.playerTwo,
                moving ? style.moving : "",
                active ? "" : activeHand,
            ].join(" ")}
                src={`./images/hands/${color}-${type}.png`} />
        </div>
    );
}