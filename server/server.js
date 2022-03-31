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

    client.on("create-room", (name) => {
        if (rooms[client.id]) return;
        let room = newId()

        client.emit("room-code", room)
        rooms[client.id] = room;

        state[room] = {
            players: {
                [client.id]: {
                    name: name,
                    score: 0
                }
            }
        }
        client.join(room)
        console.log("game created with code: ", room)
        io.to(room).emit("players", state[rooms[client.id]], room)
    })

    client.on("join-room", (room, name) => {
        // room = room.toUpperCase();
        let getRoom = io.sockets.adapter.rooms.get(room);

        let numClients = 0;

        if (getRoom) {
            numClients = getRoom.size;
        }

        if (numClients === 0) {
            console.log("room: ", JSON.stringify(getRoom))
            console.log(`${name} tried to join room ${room} but its doesnt exist`)
            return io.to(client.id).emit("no-room")
        }
        if (numClients > 1) {
            console.log(`${name} tried to join room ${room} but its full`)
            return io.to(client.id).emit("full")
        }

        rooms[client.id] = room;
        Object.assign(state[room].players, { [client.id]: { name: name, score: 0 } })
        client.join(room)
        console.log("game joined with code: ", room)

        io.to(room).emit("players", state[rooms[client.id]], room)
    })

    client.on("getinfo", (word) => {
        console.log(state[rooms[client.id]])
        console.log(state[rooms])
        console.log(rooms)
        console.log(JSON.stringify(state))
        console.log("client send", word)
        console.log(state[rooms[client.id]]?.players[0])
        console.log(state[rooms[client.id]]?.players)
    })


    client.on("rps-choice", (choice) => {
        // const player = state[rooms[client.id]].players[client.id];
        // Object.assign(player, { choice: "rock" })
        console.log("player chose: ", choice)
        // if ()

    })

    client.on("disconnect", () => {

        if (state[rooms[client.id]]) {

            // console.log(state[rooms[client.id]])
            // console.log(Object.keys(state[rooms[client.id]].players).length)

            if (Object.keys(state[rooms[client.id]].players).length === 1) {
                delete state[rooms[client.id]];
                return delete rooms[client.id];
            }

            let room = rooms[client.id]

            console.log(`${client.id} disconnected from ${room}`);
            delete state[rooms[client.id]].players[client.id];
            delete rooms[client.id];
            io.to(room).emit("players", state[rooms[client.id]])
        }
    })
})

io.listen(6969);