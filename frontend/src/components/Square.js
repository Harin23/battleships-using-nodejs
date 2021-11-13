import React, { useState } from 'react';

function Square(props) {
    const [color, setcolor] = useState('lightsalmon');
    const [oppPlayer] = useState(props.oppPlayer);

    return ( 
        <div className="square" style={{backgroundColor: color}} onClick={()=> oppPlayer ? setcolor('white') : null}>{props.coordinates}</div>
     );
}

export default Square;