import './Battleship.css'
import Grid from "../Grid";

function Battleship() {
    return ( 
        <div className="battleship">
            <div className="you"><Grid /></div>
            <div className="opp"><Grid /></div>
        </div>
     );
}

export default Battleship;