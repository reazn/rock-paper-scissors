const Server = require("socket.io").Server;
const nano = require("nanoid").customAlphabet;

const newId = nano("23456789ABCDEFGHJKLPQSTUVXYZ", 4);

const io = new Server({
    cors: {
        origin: "*",
    }
});

const state = {}
const rooms = {}

io.on("connection", client => {
    console.log(`${client.id} connected`);
    // console.log(io.sockets.adapter.rooms)

    client.on("create-room", () => {
        let room = newId()

        rooms[client.id] = room;
        client.emit("room-code", room)

        state[room] = {
            players: {
                [client.id]: {
                    name: "player1",
                    score: 0
                }
            }
        }
        client.join(room)
        console.log("game created with code: ", room)
    })

    client.on("join-room", (room, user) => {
        let getRoom = io.sockets.adapter.rooms.get(room);

        let numClients = 0;

        if (getRoom) {
            numClients = getRoom.size;
        }

        if (numClients === 0) {
            return io.to(client.id).emit("no-room")
        }
        if (numClients > 1) {
            return io.to(client.id).emit("full")
        }

        rooms[client.id] = room;
        Object.assign(state[room].players, { [client.id]: { name: "player2", score: 0 } })
        client.join(room)
        // console.log(room, " room")
        // console.log(client.rooms)

        io.to(room).emit("test")

    })

    client.on("getinfo", () => {
        console.log(state[rooms[client.id]])
        console.log(state[rooms])
    })

    client.on("disconnect", () => {
        console.log(`${client.id} disconnected`);
        // delete state[rooms[client.id]].players[client.id];
        // delete rooms[client.id];
    })
})

io.listen(6969);