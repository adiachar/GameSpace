import { useState, useEffect } from "react";
import "./BlackAndWhite.css";
import DiceContainer from "./DiceContainer";

export default function BlackAndWhite(){

    let player1 = "player 1";
    let player2 = "player 2";
    const winDest = 36;
    const blackHolePos = [4, 15, 34];
    const whiteHolePos = [17, 25, 2];

    const [randomMove, setRandomMove] = useState(0);
    const [currPosition, setCurrPosition] = useState({player1: 0, player2: 0, p1InBlackHole: false, p2InBlackHole: false});
    const [isPlayer1, setIsPlayer1] = useState(true);
    const [start, setStart] = useState(true);

    let makeMove = () =>{
        if(start){
            setStart((start) => !start); //preventing other player from making move
            let random =  Math.floor(Math.random() * 6) + 1;
            setRandomMove(random);
            if(isPlayer1){
                let destination = currPosition.player1 + random;
                if(destination > winDest){
                    setIsPlayer1(!isPlayer1);
                    setStart((start) =>!start);
                    return;
                }
                let interval = setInterval(()=>{
                    setCurrPosition((currPos) =>{
                        if(currPos.player1 < destination){
                            return ({...currPos, player1: (currPos.player1 + 1)});
                        }else{
                            clearInterval(interval);
                            setIsPlayer1((isPlayer1) => !isPlayer1);
                            setStart((start) => !start);
                            return currPos;
                        }
                    });
                }, 500);
            }else{
                let destination = currPosition.player2 + random;
                if(destination > winDest){
                    setIsPlayer1(!isPlayer1);
                    setStart((start) =>!start);
                    return;
                }
                let interval = setInterval(()=>{
                    setCurrPosition((currPos) =>{
                        if(currPos.player2 < destination){
                            return ({...currPos, player2: (currPos.player2 + 1)});
                        }else{
                            clearInterval(interval);
                            setIsPlayer1(!isPlayer1);
                            setStart((start) => !start);
                            return currPos;
                        }
                    });
                }, 500);
            } 
        }     
    } 

    let inBlackHole = (player) =>{
        let random = Math.floor(Math.random() * 3);
        if(player == "player1"){
            setCurrPosition((currPos) => (
                {...currPos, p1InBlackHole: true}
            ));
            setTimeout(()=>{
                setCurrPosition((currPos) => (
                    {...currPos, player1: whiteHolePos[random], p1InBlackHole: false}
                ));
            }, 1000);
        }else{
            setCurrPosition((currPos) => (
                {...currPos, p2InBlackHole: true}
            ));
            setTimeout(()=>{
                setCurrPosition((currPos) => (
                    {...currPos, player2: whiteHolePos[random], p2InBlackHole: false}
                ));
            }, 1000);
        }
    };

    useEffect(() =>{
        if(blackHolePos.includes(currPosition.player1)){
            inBlackHole("player1");
        }
        if(blackHolePos.includes(currPosition.player2)){
            inBlackHole("player2");
        }
        if(currPosition.player1 == winDest){
            setStart(false);
        }
        if(currPosition.player2 == winDest){
            setStart(false);
        }
    }, [isPlayer1]);
    let red = true;

    return(
        <div className="BlackAndWhite">

            <DiceContainer isPlayer1={isPlayer1} randomMove={randomMove} makeMove={makeMove} diceOf={"player1"}/>
            <div className={(currPosition.player1 === winDest || currPosition.player2 === winDest) ? "board playerWon" : "board"}>
                {[...Array(36)].map((_, idx) =>{
                    const isP1 = (idx + 1) === currPosition.player1;
                    const isP2 = (idx + 1) === currPosition.player2;
                    const blackHole = (blackHolePos.includes(idx + 1));
                    const whiteHole = (whiteHolePos.includes(idx + 1));
                    const destination = (idx + 1) === 36;
                    red = !red;
                    return (<div key={idx + 1} className={red ? (destination ? "box red win" : "box red"): (destination ? "box green win" : "box green")}>
                        {isP1 ? <div className={currPosition.p1InBlackHole ? "pan0 inBlackHole" : "pan0"}>{player1}</div>: null}
                        {isP2 ? <div className={currPosition.p2InBlackHole ? "pan1 inBlackHole" : "pan1"}>{player2}</div> : null}
                        {blackHole ? <div className="blackHole"></div> : null}
                        {whiteHole ? <div className="whiteHole"></div> : null}
                    </div>);
                })}
            </div>
            <DiceContainer isPlayer1={isPlayer1} randomMove={randomMove} makeMove={makeMove} diceOf={"player2"}/>
        </div>
    );
}