import React, { useState, useEffect } from "react";

function Square(props) {
  const [color, setcolor] = useState(props.color);
  const [oppPlayer] = useState(props.oppPlayer);
  const [coordinates] = useState(props.coordinates);

  useEffect(() => {
    if (
      props.selection !== null &&
      props.selection !== undefined &&
      props.selection.length > 0
    ) {
      setcolor(props.selection[0].color);
    } else {
      setcolor(props.color);
    }
  }, [coordinates, oppPlayer, props.selection, props.color]);

  let handleClick = () => {
    if (oppPlayer === props.turn) {
      props.makeSelection(coordinates);
    }
  };

  return (
    <div
      className="square"
      style={{ backgroundColor: color }}
      onClick={handleClick}
    >
      {props.coordinates}
    </div>
  );
}
export default Square;
