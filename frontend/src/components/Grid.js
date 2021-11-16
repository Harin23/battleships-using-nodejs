import React, { useState, useEffect } from "react";
import Square from "./Square";

function Grid(props) {
  const [map] = useState(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]);
  const [oppPlayer] = useState(props.oppPlayer);
  const [selection, setSelection] = useState(props.selection);

  useEffect(() => {
    setSelection(props.selection);
  }, [props.selection]);

  return (
    <div className="grid">
      {[...Array(10)].map((e, r) => {
        return [...Array(10)].map((_, c) => (
          <Square
            key={c * (r + 1)}
            coordinates={map[r] + (c + 1)}
            oppPlayer={oppPlayer}
            color={
              oppPlayer === false &&
              (((props.ship1 || null) &&
                props.ship1.indexOf(map[r] + (c + 1)) !== -1) ||
                ((props.ship1 || null) &&
                  props.ship2.indexOf(map[r] + (c + 1)) !== -1))
                ? "blue"
                : "lightsalmon"
            }
            turn={props.turn}
            selection={
              selection !== null &&
              selection !== undefined &&
              selection.length > 0
                ? selection.filter(
                    (obj) => obj.coordinates === map[r] + (c + 1)
                  )
                : null
            }
            makeSelection={props.makeSelection}
          />
        ));
      })}
    </div>
  );
}

export default Grid;
