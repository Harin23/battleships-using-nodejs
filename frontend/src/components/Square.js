import React, { useState, useEffect } from 'react';

function Square(props) {
    const [color, setcolor] = useState(props.color);
    const [oppPlayer] = useState(props.oppPlayer);
    // console.log(props.color, props.coordinates)

    useEffect(() => {
        setcolor(props.color)
    }, [props.color]);

    return ( 
        <div className="square" style={{backgroundColor: color}} onClick={()=> oppPlayer ? setcolor('white') : null}>{props.coordinates}</div>
     );
}

export default Square;