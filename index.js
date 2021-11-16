const express = require("express");
const cors = require("cors");
const http = require("http");
const { Console } = require("console");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let users = [],
  turn = null;
io.on("connection", (socket) => {
  console.log(io.engine.clientsCount, socket.id);
  if (io.engine.clientsCount <= 2 || users.length < 2) {
    users.push({
      id: socket.id,
      ready: false,
      ship: [],
      shipLives: null,
    });
  } else {
    index = getIndex(users, socket.id);
    index === -1 ? socket.emit("serverIsFull") : null;
  }

  socket.on("ready", (shipCoordinates) => {
    index = getIndex(users, socket.id);
    if (index > -1) {
      users[index].ready = true;
      users[index].shipLives = shipCoordinates.length;
      users[index].ship = shipCoordinates;
      io.sockets.emit("ready_status", users);
      if (
        users.length === 2 &&
        users[0].ready === true &&
        users[1].ready === true &&
        users[0].ship !== null &&
        users[1].ship[1] !== null
      ) {
        turn = users[0].id;
        io.sockets.emit("turn", turn);
      }
    }
  });

  socket.on("makeSelection", (coordinates) => {
    if (socket.id === turn) {
      data = {};
      data.coordinates = coordinates;
      data.id = turn;
      oppIndex = getIndex(users, turn) === 0 ? 1 : 0;
      hitOrMiss = users[oppIndex].ship.indexOf(coordinates);
      if (hitOrMiss > -1) {
        users[oppIndex].shipLives -= 1;
        data.color = "red";
      } else {
        data.color = "white";
      }
      io.sockets.emit("selectionMade", data);
      if (users[oppIndex].shipLives > 0) {
        turn = users[oppIndex].id;
        io.sockets.emit("turn", turn);
      } else {
        io.sockets.emit("gameover", turn);
        (users = []), (turn = null);
      }
    } else {
      socket.emit("notYourTurn");
    }
  });

  socket.on("disconnect", () => {
    index = getIndex(users, socket.id);
    if (index > -1) {
      users.splice(index, 1);
      ships = [[null], [null]];
      turn = null;
    }
  });
});

let getIndex = (users, id) => {
  return (index = users.map((e) => e.id).indexOf(id));
};

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
