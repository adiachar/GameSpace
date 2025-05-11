import stoneImg from "./assets/stone-img.png";
import paperImg from "./assets/paper-img.png";
import scissorImg from "./assets/sciccors-img.png";
import { useEffect, useState, useRef } from "react";
import sps from "./Sps.module.css";

const gameChoices = ["stone", "paper", "scissor"];
let gameInfo = "Choose any one on the left to Start the Game";
const goal = 5;

export default function StonePaperScissor(){
    let [start, setStart] = useState(true);
    let [isActive, setIsActive] = useState(true);
    let [userScore, setUserScore] = useState(0);
    let [gameScore, setGameScore] = useState(0);
    let [userChoice, setUserChoice] = useState(0);
    let [gameChoice, setGameChoice] = useState(0);
    let [middleText, setMiddleText] = useState("Lets Begin!");

    useEffect(() =>{
        if(userScore == goal){
            gameInfo = "You Won!";
            setStart(!start);
        }else if(gameScore == goal){
            gameInfo = "You Lost!";
            setStart(!start);
        }else {
            gameInfo = "";
        }
    }, [gameScore, userScore]);

    function makeChoice(event){
        if(start === true) {
            if(!isActive) {
                return;
            }
            setIsActive(false);
            let userChoice = event.target.id;
            let random = Math.floor(Math.random() * 3);
            let gameChoice = gameChoices[random];
            setUserChoice(userChoice);
            setGameChoice(gameChoice);
            compare(userChoice, gameChoice);
        } else {
            setStart(true);
            setIsActive(true);
            setUserScore(0);
            setGameScore(0);
        }
    }

    function compare(userChoice, gameChoice){
        switch(userChoice){
            case "stone": {
                if(gameChoice == "paper"){
                    setMiddleText("stone fear paper");
                    setGameScore((currScore) => currScore + 1);
                }else if(gameChoice == "scissor"){
                    setMiddleText("Stone crushes Scissors");
                    setUserScore((currScore) => currScore + 1);
                }else{
                    setMiddleText("tie!");
                }
                break;
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
                break;
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
                break;
            };
            default :{
                setMiddleText("Invalid Choice");
            }
        }
        setTimeout(() => setIsActive(true), 1000);
        setTimeout(() => setUserChoice(""), 1000);
        setTimeout(() => setGameChoice(""), 1000);
    }

    return(
        <div className={userScore === goal ? `${sps.StonePaperScissor} ${sps.win}`: (gameScore === goal ? `${sps.StonePaperScissor} ${sps.loss}`: `${sps.StonePaperScissor}`)}>
            <div className={sps.header}>
                <div className={sps.left}>
                    <h4 className={sps.currScoreTitle}>YOUR SCORE</h4>
                    <h1 className={sps.currScore}>{userScore}</h1>
                </div>
                <div className={sps.middle}>
                    <h2 className={sps.name}>STONE PAPER SCISSOR</h2>
                    <h5 className={sps.level}>Winning Score is - 5</h5>
                    <p>{gameInfo}</p>
                </div>
                <div className={sps.right}>
                    <h4 className={sps.highScoreTitle}>GAME SCORE</h4>
                    <h1 className={sps.highScore}>{gameScore}</h1>
                </div>
            </div>
            <div className={sps.container}>
                <div className={sps.user}>
                    <div className={userChoice === "stone" ? `${sps.stoneU} ${sps.click}`: `${sps.stoneU}`} ><img src={stoneImg} alt="Stone" id="stone" onClick={makeChoice} /></div>
                    <div className={userChoice === "paper" ? `${sps.paperU} ${sps.click}`: `${sps.paperU}`}><img src={paperImg} alt="Paper" id="paper" onClick={makeChoice} /></div>
                    <div className={userChoice === "scissor" ? `${sps.scissorU} ${sps.click}`: `${sps.scissorU}`}><img src={scissorImg} alt="Scissor" id="scissor" onClick={makeChoice} /></div>
                </div>
                <h4 className={sps.middleText}>{middleText}</h4>
                <div className={sps.game}>
                    <div className={gameChoice === "stone" ?  `${sps.stoneG} ${sps.click}`: `${sps.stoneG}`}><img src={stoneImg} alt="Stone" id="stone-g" /></div>
                    <div className={gameChoice === "paper" ?  `${sps.paperG} ${sps.click}`: `${sps.paperG}`}><img src={paperImg} alt="Paper" id="paper-g"  /></div>
                    <div className={gameChoice === "scissor" ? `${sps.scissorG} ${sps.click}`: `${sps.scissorG}`}><img src={scissorImg} alt="Scissor" id="scissor-g" /></div>
                </div>
            </div>
        </div>
    );
}