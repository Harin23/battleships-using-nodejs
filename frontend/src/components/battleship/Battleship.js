import "./Battleship.css";
import React, { useState, useEffect } from "react";
import Grid from "../Grid";
import Ship1 from "../Ship1";
import Ship2 from "../Ship2";
import {
  emitReadyUp,
  listenForReadyUp,
  updateTurn,
  selectionMade,
  makeSelection,
  gameover,
  serverIsFull,
  notYourTurn,
} from "../../controller/socketioController";

function Battleship(props) {
  const [rotateShip1, setrotateShip1] = useState(0);
  const [rotateShip2, setrotateShip2] = useState(0);
  const [coordinatesShip1, setcoordinatesShip1] = useState("");
  const [coordinatesShip2, setcoordinatesShip2] = useState("");
  const [ship1, setship1] = useState(null);
  const [ship2, setship2] = useState(null);
  const [ready1, setready1] = useState(false);
  const [ready2, setready2] = useState(false);
  const [warning, setwarning] = useState("");
  const [turn, setturn] = useState(null);
  const [selection1, setselection1] = useState([]);
  const [selection2, setselection2] = useState([]);
  const [winner, setwinner] = useState(null);
  const [error, seterror] = useState(false);

  useEffect(() => {
    if (props.socket) {
      listenForReadyUp(props.socket, setready1, setready2);
      updateTurn(props.socket, setturn);
      selectionMade(props.socket, setselection1, setselection2);
      gameover(props.socket, setwinner, setturn);
      notYourTurn(props.socket, setwarning);
      serverIsFull(props.socket, seterror, setwarning);
    }
  }, [props.socket]);

  let handleSelection = (coordinates) => {
    makeSelection(props.socket, coordinates);
  };

  let handleRotate1 = (e) => {
    switch (rotateShip1) {
      case 0:
        setrotateShip1(90);
        break;
      case 90:
        setrotateShip1(180);
        break;
      case 180:
        setrotateShip1(270);
        break;
      case 270:
        setrotateShip1(0);
        break;
      default:
        setrotateShip1(0);
        break;
    }
  };

  let handleRotate2 = (e) => {
    switch (rotateShip2) {
      case 0:
        setrotateShip2(90);
        break;
      case 90:
        setrotateShip2(180);
        break;
      case 180:
        setrotateShip2(270);
        break;
      case 270:
        setrotateShip2(0);
        break;
      default:
        setrotateShip2(0);
        break;
    }
  };

  let handleCoordinateInput1 = (e) => {
    let val = e.target.value;
    if (val.length === 0) {
      setcoordinatesShip1(e.target.value);
    } else if (val.length === 1 && val.match(/[a-j]{1}/i) !== null) {
      setcoordinatesShip1(e.target.value.toUpperCase());
    } else {
      if (ensureCorrectInputType(val)) {
        setcoordinatesShip1(e.target.value.toUpperCase());
      }
    }
  };

  let handleCoordinateInput2 = (e) => {
    let val = e.target.value;
    if (val.length === 0) {
      setcoordinatesShip2(e.target.value);
    } else if (val.length === 1 && val.match(/[a-j]{1}/i) !== null) {
      setcoordinatesShip2(e.target.value.toUpperCase());
    } else {
      if (ensureCorrectInputType(val)) {
        setcoordinatesShip2(e.target.value.toUpperCase());
      }
    }
  };

  let ensureCorrectInputType = (input) => {
    return input.match(/^([a-j]{1})([0-9]{1}|10)$/i) == null ? false : true;
  };

  let checkBoundary = (coordinates, length, orientation) => {
    let map = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    if (ensureCorrectInputType(coordinates)) {
      coordinates = coordinates.match(/^([a-j]{1})([0-9]{1}|10)$/i);
      if (orientation === 0) {
        let row = map.indexOf(coordinates[1]);
        return row + length <= map.length ? true : false;
      } else if (orientation === 90) {
        return parseInt(coordinates[2]) - length >= 0 ? true : false;
      } else if (orientation === 180) {
        let row = map.indexOf(coordinates[1]);
        return row + 1 - length >= 0 ? true : false;
      } else if (orientation === 270) {
        return parseInt(coordinates[2]) - 1 + length <= 10 ? true : false;
      }
    }
  };

  let getShipSquareCoordinates = (ship) => {
    let map = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    let temp = [ship.coordinates];
    let coordinates = ship.coordinates.match(/^([a-j]{1})([0-9]{1}|10)$/i);

    if (ship.orientation === 0) {
      let curr = map.indexOf(coordinates[1]);
      for (let i = 0; i < ship.len - 1; i++) {
        temp.push(map[++curr] + coordinates[2]);
      }
    } else if (ship.orientation === 90) {
      let curr = coordinates[2];
      for (let i = 0; i < ship.len - 1; i++) {
        temp.push(coordinates[1] + --curr);
      }
    } else if (ship.orientation === 180) {
      let curr = map.indexOf(coordinates[1]);
      for (let i = 0; i < ship.len - 1; i++) {
        temp.push(map[--curr] + coordinates[2]);
      }
    } else if (ship.orientation === 270) {
      let curr = coordinates[2];
      for (let i = 0; i < ship.len - 1; i++) {
        temp.push(coordinates[1] + ++curr);
      }
    }
    return temp;
  };

  let checkShipOverlap = (tempShip1, tempShip2) => {
    let res = true;
    if (tempShip1 !== null && tempShip2 !== null) {
      tempShip1.forEach((coordinate) => {
        if (tempShip2.indexOf(coordinate) !== -1) {
          res = false;
        }
      });
      return res;
    } else {
      return false;
    }
  };

  let handlePlaceOnGrid = () => {
    if (checkBoundary(coordinatesShip1, 2, rotateShip1)) {
      if (checkBoundary(coordinatesShip2, 3, rotateShip2)) {
        setwarning("");
        let tempShip1 = getShipSquareCoordinates({
          shipNum: 1,
          coordinates: coordinatesShip1,
          orientation: rotateShip1,
          len: 2,
        });
        let tempShip2 = getShipSquareCoordinates({
          shipNum: 2,
          coordinates: coordinatesShip2,
          orientation: rotateShip2,
          len: 3,
        });
        if (checkShipOverlap(tempShip1, tempShip2)) {
          setship1(tempShip1);
          setship2(tempShip2);
        } else {
          setwarning(
            "Invalid Coordinates: Ships cannot be placed on top of each other. Try again."
          );
          setcoordinatesShip1("");
          setrotateShip1(0);
          setcoordinatesShip2("");
          setrotateShip2(0);
          setship1(null);
          setship2(null);
        }
      } else {
        setwarning(
          "Invalid Coordinates: Ship 2 was not fully placed on the grid. Try again."
        );
        setcoordinatesShip2("");
        setrotateShip2(0);
      }
    } else {
      setwarning(
        "Invalid Coordinates: Ship 1 was not fully placed on the grid. Try again."
      );
      setcoordinatesShip1("");
      setrotateShip1(0);
    }
  };

  let handleReadyUp = () => {
    if (ship1 !== null && ship2 !== null) {
      emitReadyUp(props.socket, [...ship1, ...ship2]);
    } else {
      setwarning("Please place the ships on the grid first.");
    }
  };

  return (
    <div className="battleship">
      <div className="you">
        <h1 className="player">
          You:{" "}
          <span className="player-status">
            {winner === null
              ? ready1 === false
                ? "Not Ready"
                : ready2
                ? turn === true
                  ? "Your Turn"
                  : ""
                : "Ready"
              : winner === true
              ? "You won"
              : "You Lost"}
          </span>
        </h1>
        <Grid
          oppPlayer={false}
          ship1={ship1}
          ship2={ship2}
          turn={turn}
          selection={selection1}
          makeSelection={handleSelection}
        />
        {turn === null && winner === null ? (
          <div className="settings">
            <div className="ships">
              <Ship1 rotate={rotateShip1} />
              <div className="ship1-options">
                <button onClick={handleRotate1}>Rotate 1</button>
                <input
                  onChange={handleCoordinateInput1}
                  value={coordinatesShip1}
                  maxLength={3}
                  autoCapitalize="characters"
                  placeholder="Enter Coordinates for Ship 1"
                />
              </div>
              <div className="place-button">
                <button onClick={handlePlaceOnGrid} disabled={error}>
                  Place On Grid
                </button>
              </div>
              <div className="ship2-options">
                <button onClick={handleRotate2}>Rotate 2</button>
                <input
                  onChange={handleCoordinateInput2}
                  value={coordinatesShip2}
                  maxLength={3}
                  placeholder="Enter Coordinates for Ship 2"
                />
              </div>
              <Ship2 rotate={rotateShip2} turn={turn} />
            </div>
            <div className="warnings">{warning}</div>
            <div className="start-button">
              <button onClick={handleReadyUp} disabled={error}>
                Ready up
              </button>
            </div>
          </div>
        ) : turn === null && winner !== null ? (
          <div className="restart">Refresh the page to play again.</div>
        ) : null}
      </div>
      <div className="opp">
        <h1 className="player">
          The opp:{" "}
          <span className="player-status">
            {ready2 === false
              ? "Not Ready"
              : ready1
              ? turn === false
                ? "Their Turn"
                : ""
              : "Ready"}
          </span>
        </h1>
        <Grid
          oppPlayer={true}
          turn={turn}
          selection={selection2}
          makeSelection={handleSelection}
        />
      </div>
    </div>
  );
}

export default Battleship;
