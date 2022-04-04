import React from "react";
import { useState, useEffect } from "react";
import style from "style/pages/menu.module.scss";
import { socket } from "../context/socket";

export default function Menu({ parentCallback }) {

    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    //todo setting to yellow might break somethign
    const [chosenColor, setChosenColor] = useState("");
    const [showMenu, setShowMenu] = useState(true);

    function test() {
        socket.emit("getinfo", "pp");
    }

    function createRoom(pname, pcolor) {
        socket.emit("create-room", pname, pcolor);
        setShowMenu(false);
    }

    function joinRoom(input, pname, pcolor) {
        socket.emit("join-room", input, pname, pcolor);
        setShowMenu(false);
    }

    // todo: Delete
    useEffect(() => {
        socket.on("room-code", (code) => {
            console.log("room code in menu = ", code);
        })
    })

    let colors = [
        { "yellow": "#D3B542" },
        { "blue": "#649DB1" },
        { "green": "#9CBB38" },
        { "white": "#BE9C7A" },
        { "darkwhite": "#AF8865" },
        { "lightbrown": "#A47B5B" },
        { "brown": "#8E5937" },
        { "black": "#3C2B22" },
    ];

    return (
        <div className={[style.menu, showMenu ? "" : style.hide].join(" ")}>

            <div className={style.background}>
                <div className={style.pattern}></div>
                <div className={style.pattern}></div>
                <div className={style.pattern}></div>
            </div>
            <div className={style.title}>
                <span className={style.rock}>rock</span>
                <span className={style.paper}>paper</span>
                <span className={style.scissors}>scissors</span>
            </div>

            <div className={style.options}>
                <label htmlFor="name">NAME</label>
                <input className={style.input} id="name" placeholder="JOHN DOE" value={name} onInput={e => setName(e.target.value)} type="text" />
                <label htmlFor="colors" style={{ marginBottom: "10px" }}>SKIN</label>
                <ul className={style.colorpicker} id="colors">
                    {colors.map((color, index) => {
                        return <li key={index}
                            onClick={() => {
                                setChosenColor(color);
                                parentCallback(Object.keys(color)[0]);
                            }}
                            className={[style.color, Object.keys(chosenColor)[0] == Object.keys(color) ? style.active : ""].join(" ")}
                            style={{ backgroundColor: Object.values(color) }}
                        />
                    })}
                </ul>
                <button className={style.button} style={{ backgroundColor: Object.values(chosenColor) }} onClick={() => createRoom(name, chosenColor)}>Create Game</button>
                <label htmlFor="code">JOIN GAME</label>
                <div className={style.join}>
                    <input className={style.input} id="code" style={{ textTransform: "uppercase" }} placeholder="Game Code" value={code} onInput={e => setCode(e.target.value)} type="text" />
                    <button className={style.button} style={{ backgroundColor: Object.values(chosenColor) }} onClick={() => joinRoom(code, name, chosenColor)}>Join</button>
                </div>
            </div>

        </div>
    );
}