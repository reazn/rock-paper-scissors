import React, { useState } from "react";
import style from "style/components/picker.module.scss";
import { socket } from "../context/socket";

export default function Picker({ active, color = "yellow" }) {

    const [isActive, setActive] = useState(active);

    function choice(type) {
        socket.emit("rps-choice", type);
        setActive(false);
    }

    return (
        <div className={[style.picker, isActive ? style.active : ""].join(" ")}>
            <div className={style.options}>
                <img
                    onClick={() => choice("rock")}
                    className={style.image}
                    src={`/images/${color}-rock.png`}
                />
                <img
                    onClick={() => choice("paper")}
                    className={style.image}
                    src={`/images/${color}-paper.png`}
                />
                <img
                    onClick={() => choice("scissors")}
                    className={style.image}
                    src={`/images/${color}-scissors.png`}
                />
            </div>
        </div>
    );
}