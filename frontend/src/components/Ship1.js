function Ship1(props) {
    return ( 
        <div className="ship1" style={{transform: 'rotate('+props.rotate+'deg)'}}>
            {[...Array(2)].map((_, i)=> <div key={i} className="square" style={{backgroundColor: 'blue'}}>{i+1}</div> )}
        </div>
     );
}

export default Ship1;