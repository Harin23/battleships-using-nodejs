function Ship2(props) {
    return ( 
        <div className="ship2" style={{transform: 'rotate('+props.rotate+'deg)'}}>
            {[...Array(3)].map((_, i)=> <div key={i} className="square" style={{backgroundColor: 'blue'}}>{i+1}</div> )}
        </div>
     );
}

export default Ship2;