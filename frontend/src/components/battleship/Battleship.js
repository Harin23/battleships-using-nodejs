import './Battleship.css'
import Grid from "../Grid";

function Battleship() {
    return ( 
        <div className="battleship">
            <div className="you">
                <h1 className='player'>You:</h1>
                <Grid oppPlayer={false} />
                <div className="ships">
                    <div className="ship1">
                        {[...Array(2)].map((_, i)=> <div key={i} className="square" style={{backgroundColor: 'blue'}}></div> )}
                    </div>
                    {/* <div className="ship2">
                        {[...Array(3)].map((_, i)=> <div key={i} className="square" style={{backgroundColor: 'blue'}}></div> )}
                    </div> */}
                </div>
                {/* <div className="info player">
                    <button id='start'>Start Game</button>
                    <button id="rotate">Rotate</button>
                    <h4 id="turn">Your Turn</h4>
                </div> */}
            </div>
            <div className="opp">
                <h1 className='player'>The opp:</h1>
                <Grid oppPlayer={true} />
            </div>
        </div>
     );
}

export default Battleship;