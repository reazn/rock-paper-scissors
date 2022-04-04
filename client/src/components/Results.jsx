import React from "react";
import style from "style/components/results.module.scss";

export default function Results({ winner, draw }) {

    return (
        <div className={style.results}>
            <div className={[style.wrapper, winner ? style.active : ""].join(" ")}>
                {draw ?
                    <div className={style.text}>
                        <span>it's a</span>
                        <span>draw!</span>
                    </div>
                    :
                    <div className={style.text}>
                        <span>{winner.name}</span>
                        <span>won!</span>
                    </div>
                }
            </div>
        </div >
    )
}