import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "http://localhost:8081";
const id = localStorage.getItem("userid");
let socket;
if (localStorage.getItem("userid")) {
  socket = io(URL, { query: "id=" + id });
}

export { socket };

// Amit will try to follow Ram and Ram should get follow request in real time.

// I will lgin as Amit in one browser and click on follow

//a socket event  will be recieved by the server with some id
//this id will be socket id of Ram
//we will find this socket id in connectedusers object
//we will emit (follow request recieved) on this socket id only
