import "./Sps.css";

import stoneImg from "./assets/stone-img.png";
import paperImg from "./assets/paper-img.png";
import scissorImg from "./assets/sciccors-img.png";
import { useEffect, useState } from "react";

const gameChoices = ["stone", "paper", "scissor"];
let gameInfo = "Choose any one on the left to Start the Game";
let userChoice = "";
let gameChoice = "";
const goal = 5;

export default function StonePaperScissor(){
    let [start, setStart] = useState( true);
    let [userScore, setUserScore] = useState(0);
    let [gameScore, setGameScore] = useState(0);
    let [middleText, setMiddleText] = useState("Lets Begin!");

    useEffect(() =>{
        if(userScore == goal){
            gameInfo = "You Won!";
            setStart(!start);
        }else if(gameScore == goal){
            gameInfo = "You Lost!";
            setStart(!start);
        }else if(userScore != goal && userScore > gameScore){
            gameInfo = "You are winning";
        }else if(gameScore != goal && gameScore > userScore){
            gameInfo = "Trust Your Luck!";
        }
    }, [gameScore, userScore]);

    function makeChoice(event){
        if(start === true){
            userChoice = event.target.id;
            let random = Math.floor(Math.random() * 3);
            gameChoice = gameChoices[random];
            compare();
        }else{
            setStart(!start);
            setUserScore(0);
            setGameScore(0);
            gameInfo = "Choose any one on the left to Start the Game";
        }
    }

    function compare(){
        switch(userChoice){
            case "stone": {
                if(gameChoice == "paper"){
                    setMiddleText("store fear paper");
                    setGameScore((currScore) => currScore + 1);
                }else if(gameChoice == "scissor"){
                    setMiddleText("Stone crushes Scissors");
                    setUserScore((currScore) => currScore + 1);
                }else{
                    setMiddleText("tie!");
                }
                return;
            };
            case "paper": {
                if(gameChoice == "stone"){
                    setMiddleText("Paper covers Stone");
                    setUserScore((currScore) => currScore + 1);
                }else if(gameChoice == "scissor"){
                    setMiddleText("Paper is cut by Scissors");
                    setGameScore((currScore) => currScore + 1);
                }else{
                    setMiddleText("tie!");
                }
                return;
            };
            case "scissor": {
                if(gameChoice == "paper"){
                    setMiddleText("Scissors cut Paper");
                    setUserScore((currScore) => currScore + 1);
                }else if(gameChoice == "stone"){
                    setMiddleText("Scissors are crushed by Stone");
                    setGameScore((currScore) => currScore + 1);
                }else{
                    setMiddleText("tie!");
                }
                return;
            };
            default :{
                setMiddleText("Invalid Choice");
            }
        }
    }

    return(
        <div className={userScore === goal ? "StonePaperScissor win": (gameScore === goal ? "StonePaperScissor loss": "StonePaperScissor")}>
            <header>
                <h1>STONE PAPER SEASOR</h1>
                <h3>{gameInfo}</h3>
                <div className="score"><h4 className="user-score">Your Score : {userScore}</h4><h4>The Goal is 5</h4><h4 className="game-score">Game Score : {gameScore}</h4></div>
            </header>
            <div className="container">
                <div className="user">
                    <div className={userChoice === "stone" ? "stone-u click": "stone-u"} ><img src={stoneImg} alt="Stone" id="stone" onClick={makeChoice} /></div>
                    <div className={userChoice === "paper" ? "paper-u click": "paper-u"}><img src={paperImg} alt="Paper" id="paper" onClick={makeChoice} /></div>
                    <div className={userChoice === "scissor" ? "scissor-u click": "scissor-u"}><img src={scissorImg} alt="Scissor" id="scissor" onClick={makeChoice} /></div>
                </div>
                <h4 className="middle-text">{middleText}</h4>
                <div className="game">
                    <div className={gameChoice === "stone" ? "stone-g click": "stone-g"}><img src={stoneImg} alt="Stone" id="stone-g" /></div>
                    <div className={gameChoice === "paper" ? "paper-g click": "paper-g"}><img src={paperImg} alt="Paper" id="paper-g"  /></div>
                    <div className={gameChoice === "scissor" ? "scissor-g click": "scissor-g"}><img src={scissorImg} alt="Scissor" id="scissor-g" /></div>
                </div>
            </div>
        </div>
    );
}