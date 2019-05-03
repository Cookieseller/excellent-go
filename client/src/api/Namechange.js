import io from "socket.io-client";
const socket = io.connect("http://team-excellent.de:3000", {
  reconnect: true,
  //secure: true
});
//const socket = openSocket("https://team-excellent.de:3000");

function subscribeToNameChange(callback) {
  socket.on("namechange", name => callback(null, name));
  socket.emit("subscribeToNameChange", 1000);
}
export { subscribeToNameChange };
