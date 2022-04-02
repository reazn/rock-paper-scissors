import React, { useEffect, useState, useRef } from "react";
// import Hand from "components/Hand";
import style from "style/components/picker.module.scss";
import { socket } from "../context/socket";

export default function Picker() {

    const [active, setActive] = useState(true)

    function choice(type) {
        socket.emit("rps-choice", type)
        // setActive(!active)
    }

    return (
        <div className={[style.picker, active ? style.active : ""].join(" ")}>
            <div className={style.options}>
                <img
                    onClick={() => choice("rock")}
                    className={style.image}
                    src={"/images/rock.png"}
                />
                <img
                    onClick={() => choice("paper")}
                    className={style.image}
                    src={"/images/paper.png"}
                />
                <img
                    onClick={() => choice("scissors")}
                    className={style.image}
                    src={"/images/scissors.png"}
                />
            </div>
        </div>
    );
}