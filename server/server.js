const Server = require("socket.io").Server;
const nano = require("nanoid").customAlphabet;
const computeWinner = require("./game.js")

const newId = nano("23456789ABCDEFGHJKLPQRSTUVXYZ", 4);

const io = new Server({
    cors: {
        origin: "*",
    }
});

const state = {};
const rooms = {};

io.on("connection", client => {
    console.log(`${client.id} connected`);

    client.on("create-room", (name, color) => {
        if (rooms[client.id]) return;
        if (!name) { name = "Player 1" }
        if (!color) { color = "yellow" }
        let room = newId();

        client.emit("room-code", room);
        rooms[client.id] = room;

        state[room] = {
            players: {
                [client.id]: {
                    name: name,
                    color: color,
                    score: 0,
                    choice: "",
                }
            }
        }

        client.join(room);
        io.to(room).emit("players", state[rooms[client.id]], room);
    })

    client.on("join-room", (room, name, color) => {
        if (!name) { name = "Player 2" }
        if (!color) { color = "yellow" }

        let getRoom = io.sockets.adapter.rooms.get(room);

        let numClients = 0;

        if (getRoom) {
            numClients = getRoom.size;
        }

        if (numClients === 0) {
            return client.emit("error", `A room with code ${room} does not exist.`);
        }

        if (numClients > 1) {
            return client.emit("error", "That room is full.");
        }

        rooms[client.id] = room;
        Object.assign(state[room].players, {
            [client.id]: {
                name: name,
                color: color,
                score: 0,
                choice: "",
            }
        });

        client.join(room);
        io.to(room).emit("players", state[rooms[client.id]], room);
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
        if (!state[rooms[client.id]]) return;

        const players = state[rooms[client.id]].players;

        Object.assign(players[client.id], { choice: choice });

        io.to(rooms[client.id]).emit("players", state[rooms[client.id]], rooms[client.id]);

        let playerOne = Object.values(players)[0];
        let playerTwo = Object.values(players)[1];

        if (playerOne.choice && playerTwo?.choice) {

            let winner = computeWinner(playerOne, playerTwo);

            if (winner !== "draw") {
                winner.score++;
            }

            io.to(rooms[client.id]).emit("rps-winner", winner);

            playerOne.choice = "";
            playerTwo.choice = "";
        }
    })

    client.on("rps-reset", () => {
        if (!state[rooms[client.id]]) return;
        io.to(rooms[client.id]).emit("players", state[rooms[client.id]], rooms[client.id]);

    })

    client.on("disconnect", () => {
        if (state[rooms[client.id]]) {

            let room = rooms[client.id];
            console.log(`${client.id} disconnected from ${room}`);

            if (Object.keys(state[rooms[client.id]].players).length === 1) {
                delete state[rooms[client.id]];
                return delete rooms[client.id];
            }

            delete state[rooms[client.id]].players[client.id];
            io.to(room).emit("players", state[rooms[client.id]], rooms[client.id]);
            delete rooms[client.id];
        }
    })
})

io.listen(6969);