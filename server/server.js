// import { Server } from "socket.io";
const Server = require("socket.io").Server;
const nano = require("nanoid").customAlphabet;

const newId = nano("23456789ABCDEFGHJKLPQSTUVXYZ", 4);

const io = new Server({
    cors: {
        origin: "*",
    }
});

io.on("connection", client => {
    console.log(client.conn.remoteAddress, " connected");

    client.on("newGame", () => {
        let room = newId()
        console.log(room);
    })
})

io.listen(6969);