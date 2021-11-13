import React, { useState } from 'react';
import Square from './Square';

function Grid(props) {
    const [map] = useState(["A","B","C","D","E","F","G","H","I","J"]);
    const [oppPlayer] = useState(props.oppPlayer);
    return ( 
        <div className='grid'>
            {[...Array(10)].map((e, r) => {
                return [...Array(10)].map((_, c) => <Square key={c*(r+1)} coordinates={map[r]+(c+1)} oppPlayer={oppPlayer}/>)
            })}
        </div>
     );
}

export default Grid;