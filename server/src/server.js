import express from "express";
import fs from "fs";
import { createServer, Server } from "http";
import https from "https";
import * as path from "path";
import socketIo from "socket.io";
import Room from "./model/Room"

const app    = express();

/*
const server = https.createServer({
  cert: fs.readFileSync("/etc/letsencrypt/live/team-excellent.de/fullchain.pem"),
  key: fs.readFileSync("/etc/letsencrypt/live/team-excellent.de/privkey.pem"),
}, app);
*/
const server = createServer(app);
const io = socketIo(server);

console.log(__dirname);
app.use(express.static("../client/build"));
app.use(express.static("../client/public"));
app.use(express.static("../client/public/images"));
app.get("/", (req, res) => {
    console.log("Request, sending file");
    res.sendFile(path.join(__dirname + "/index.html"));
});

const testRoom = new Room("Testraum");

io.on("connection", (socket) => {
    
    socket.join("Testraum");
    
    socket.on("subscribeToNameChange", () => {
        socket.emit("namechange", "Testraum");
    });
    
    socket.on("members", () => {
        socket.emit("members", testRoom.getMembers());
    });

    socket.on("select_demo", (demoId) => {
        const rooms = Object.keys(socket.rooms).filter((item) => item !== socket.id);
        rooms.forEach((loadRoom) => {
            io.in(loadRoom).emit("change_map", demoId);
        });
    });
});

server.listen(3001, () => {
  console.log("Listening on *:3001");
});