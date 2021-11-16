export function listenForReadyUp(socket, setReady1, setReady2) {
  socket.on("ready_status", (users) => {
    users.forEach((obj) => {
      if (obj.ready === true) {
        obj.id === socket.id ? setReady1(true) : setReady2(true);
      }
    });
  });
}

export function emitReadyUp(socket, ship) {
  socket.emit("ready", ship);
}

export function updateTurn(socket, setturn) {
  socket.on("turn", (turn) => {
    socket.id === turn ? setturn(true) : setturn(false);
  });
}

export function selectionMade(socket, setselection1, setselection2) {
  socket.on("selectionMade", (data) => {
    if (data.id === socket.id) {
      setselection2((prevState) => [
        ...prevState,
        { coordinates: data.coordinates, color: data.color },
      ]);
    } else {
      setselection1((prevState) => [
        ...prevState,
        { coordinates: data.coordinates, color: data.color },
      ]);
    }
  });
}

export function makeSelection(socket, selection) {
  selection !== null && socket.emit("makeSelection", selection);
}

export function gameover(socket, setWinner, setturn) {
  socket.on("gameover", (winner) => {
    setturn(null);
    socket.id === winner ? setWinner(true) : setWinner(false);
  });
}

export function serverIsFull(socket, setError, setwarning) {
  socket.on("serverIsFull", () => {
    setError(true);
    setwarning("Server is Full, try again later");
    socket.disconnect();
  });
}

export function notYourTurn(socket, setwarning) {
  socket.on("notYourTurn", () => {
    setwarning("Not your turn.");
  });
}
