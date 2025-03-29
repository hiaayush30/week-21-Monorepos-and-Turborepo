import { WebSocket, WebSocketServer } from "ws";
import crypto from "crypto";

const server = new WebSocketServer({ port: 4000 });

type roomType = {
    id: string;
    sockets: Array<WebSocket>
}

const generateRoomCode = () => crypto.randomBytes(2).toString("hex");
const rooms: Array<roomType> = [];

server.on("connection", (socket) => {
    socket.on("message", async (msg) => {
        let data;
        if (msg instanceof Blob) {
            data = await msg.text();
        } else {
            data = msg.toString();
        }
        data = await JSON.parse(data);
        if (data.type == "join") {
            let roomCode = data?.roomCode;
            if (roomCode) {
                const room = rooms.find(room => room.id === roomCode)
                if (room) {
                    room.sockets.push(socket);
                    socket.send(JSON.stringify({
                        message: "Connected to room:" + room.id,
                        roomId: room.id
                    }))
                } else {
                    socket.send(JSON.stringify({
                        error: "Room not found"
                    }))
                }
            } else {
                const newRoom = {
                    id: generateRoomCode(),
                    sockets: [socket]
                }
                rooms.push(newRoom);
                socket.send(JSON.stringify({
                    message: "Connected to " + newRoom.id,
                    roomId: newRoom.id
                }))
            }
        } else if (data.type == "chat") {
            let message = data?.message;
            if (!message) {
                socket.send(JSON.stringify({
                    message: "message required"
                }))
            } else {
                const room = rooms.find(room => room.sockets.includes(socket));
                room?.sockets.forEach(s => {
                    s.send(message)
                })
            }
        }
        socket.on("close",()=>{
            console.log("socket disconnected")
        })
    })
})