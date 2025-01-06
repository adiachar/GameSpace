import "./DiceContainer.css";

export default function DiceContainer({isPlayer1, randomMove, makeMove, diceOf}){
    let diceOfP1 = false;
    if(diceOf === "player1"){
        diceOfP1 = true;
    }
    return(
        <div className="DiceContainer" style={(isPlayer1 && diceOfP1) ? {boxShadow: "0px 0px 10px green"}: ((!isPlayer1 && !diceOfP1) ? {boxShadow: "0px 0px 10px green"} : {})}>
            <h3 id="playerName">{(diceOfP1) ? "Player 1" : "Player2"}</h3>
            <button className="dice" onClick={ (isPlayer1 && diceOfP1) ? makeMove : ((!isPlayer1 && !diceOfP1) ? makeMove : () => console.log("player is not you"))}>{randomMove}</button>
        </div>
    );
}