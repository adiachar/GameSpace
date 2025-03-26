import "./DiceContainer.css";

export default function DiceContainer({isPlayer1, randomMove, makeMove, diceOf, playerName}){
    let diceOfP1 = false;
    if(diceOf === "player1"){
        diceOfP1 = true;
    }
    return(
        <div className="DiceContainer" style={(isPlayer1 && diceOfP1) ? {border: "5px solid rgba(255, 255, 255, 0.35)"}: ((!isPlayer1 && !diceOfP1) ? {border: "5px solid rgba(255, 255, 255, 0.7)"} : {})}>
            <h3 id="playerName">{playerName}</h3>
            <button className={`dice ${isPlayer1 && !diceOfP1 ? "disable" : (!isPlayer1 && diceOfP1 ? "disable" : "")}`} onClick={ (isPlayer1 && diceOfP1) ? makeMove : ((!isPlayer1 && !diceOfP1) ? makeMove : () => console.log("player is not you"))}>{randomMove}</button>
        </div>
    );
}