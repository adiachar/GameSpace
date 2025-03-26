import { useState } from "react";
import ss from "./SimonSay.module.css";
import { useEffect } from "react";

let userArray = [];
let gameArray = [];
let start = false;
let score = 0;
let highScore = 0;
let idx = 0;
let gameOver = false;
let status = "press any key to start the game";


export default function(){
    const [currBox, setCurrBox] = useState("");
    const [level, setLevel] = useState(0);

    document.addEventListener("keydown", () => {
        if(!start) {
            start = true;
            status = "Keep Going";
            gameOver = false;
            gameMove();
        } else {
            status = "continue selecting the box";
        }
    });

    useEffect(() =>{
        if(start){
           setTimeout(() => gameMove(), 1000); 
        }
    }, [level]);

    function changeCurrBox(box){
        setCurrBox(box);
        setTimeout(() => {setCurrBox(null)}, 500);
    }

    function gameMove(){
        let random = Math.floor(Math.random() * 4) + 1;
        changeCurrBox(`box${random}`);
        gameArray.push(`box${random}`);
        console.log(gameArray);
    }

    function userMove(event){
        if(!start) {
            return;
        }

        let currBox = event.target.id;
        changeCurrBox(currBox);
        if(currBox == gameArray[idx]){
            userArray.push(currBox);
            idx++;
            if(idx == gameArray.length){
                idx = 0;
                userArray = [];
                score = score + 5;
                highScore = Math.max(score, highScore);
                setLevel(currLevel => currLevel + 1);
            }
        } else {
            gameOver = true;
            idx = 0;
            gameArray = [];
            userArray = [];
            setTimeout(() => {
                setLevel(0);
                score = 0;
                gameOver = false;
                start = false;
            }, 2000);
        }
    }

    function flash(box){
        if(currBox === box){
            return ss.flash;
        }else{
            return "";
        }
    }
 
    return(
        <div className={`${ss.SimonSay} ${gameOver && ss.gameOver}`}>
            <div className={ss.header}>
                <div className={ss.left}>
                    <h4 className={ss.currScoreTitle}>SCORE</h4>
                    <h1 className={ss.currScore}>{score}</h1>
                </div>
                <div className={ss.middle}>
                    <h2 className={ss.name}>SIMON SAYS GAME</h2>
                    <h5 className={ss.level}>{gameOver ? "Game Over" :`LEVEL - ${level}`}</h5>
                    {level == 0 && <p>Press Any key in the keyboard to start the game!</p>}
                </div>
                <div className={ss.right}>
                    <h4 className={ss.highScoreTitle}>HIGH SCORE</h4>
                    <h1 className={ss.highScore}>{highScore}</h1>
                </div>
            </div>
         
            <div className={`${ss.container}`}>
                <div className={`${ss.box1} ${ss.box} ${flash("box1")}`} id = {`box1`} onClick={userMove}></div>
                <div className={`${ss.box2} ${ss.box} ${flash("box2")}`} id = {`box2`} onClick={userMove}></div>
                <div className={`${ss.box3} ${ss.box} ${flash("box3")}`} id = {`box3`} onClick={userMove}></div>
                <div className={`${ss.box4} ${ss.box} ${flash("box4")}`} id = {`box4`} onClick={userMove}></div>
            </div>
        </div>
    );
}