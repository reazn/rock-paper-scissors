import React from "react";
import style from "style/components/scoreboard.module.scss";

export default function Scoreboard({ playerOne, playerTwo }) {

    return (
        <div className={style.scoreboard}>
            <div className={style.players}>
                <div className={style.player}>
                    <span className={style.name}>{playerOne?.name || "Waiting..."}</span>
                    <span className={style.score}>{playerOne?.score || "0"}</span>
                </div>
                <div className={style.player}>
                    <span className={style.name}>{playerTwo?.name || "Waiting..."}</span>
                    <span className={style.score}>{playerTwo?.score || "0"}</span>
                </div>
            </div>
        </div>
    );
}