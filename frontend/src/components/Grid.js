import React, { useState, useEffect } from 'react';

function Grid() {
    const [gridStyles, setgridStyles] = useState({'height':'42vh','width':'42vw','display':'flex','flexWrap':'wrap','backgroundColor':'lightgray'});
    const [squareStyles, setsquareStyles] = useState({ height: '4vh',width: '4vw',backgroundColor: 'lightsalmon',margin: '0.1vh 0.1vw'});
    const [map, setmap] = useState(["A","B","C","D","E","F","G","H","I","J"]);
    return ( 
        <div style={gridStyles}>
            {[...Array(10)].map((e, r) => {
                return [...Array(10)].map((_, c) => <div key={c*(r+1)} style={squareStyles} onClick={()=>{console.log('hello')}}>{map[r]+(c+1)}</div>)
            })}
        </div>
     );
}

export default Grid;