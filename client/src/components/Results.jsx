import React from "react";
import style from "style/components/results.module.scss";

export default function Results({ winner, draw }) {

    return (
        <div className={style.results}>
            <div className={[style.wrapper, winner ? style.active : ""].join(" ")}>
                {draw ? <span>it's a</span> : ""}
                <span>{winner}{draw ? "!" : ""}</span>
                {!draw ? "" : <span>won!</span>}
            </div>
        </div >
    )
}