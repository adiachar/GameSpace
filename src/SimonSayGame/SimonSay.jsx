import { useState } from "react";
import "./SimonSay.css";
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
        console.log("in keyDown");
        if(!start){
            start = true;
            status = "Keep Going";
            gameOver = false;
            gameMove();
        }else{
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

    function gameMove(event){
        let random = Math.floor(Math.random() * 4) + 1;
        changeCurrBox(`box${random}`);
        gameArray.push(`box${random}`);
        console.log(gameArray);
    }

    function userMove(event){
        let currBox = event.target.id;
        changeCurrBox(currBox);
        if(currBox == gameArray[idx]){
            userArray.push(currBox);
            idx++;
            if(idx == gameArray.length){
                idx = 0;
                userArray = [];
                score = score + 5;
                status = "_";
                highScore = Math.max(score, highScore);
                setLevel(currLevel => currLevel + 1);
                
            }
        }else{
            gameOver = true;
            status = "Game Over";
            idx = 0;
            gameArray = [];
            userArray = [];
            setTimeout(() => {
                setLevel(0);
                score = 0;
                status = "Try Again!";
                gameOver = false;
            }, 2000);
        }
    }

    function flash(box){
        if(currBox === box){
            return "flash";
        }else{
            return "";
        }
    }
 
    return(
        <div className={`SimonSay ${gameOver && 'gameOver'}`}>
            <header>
                <h1>SIMON SAYS GAME</h1>
                <h4>{status}</h4>
                <div className="scores"><h2>Score: {score}</h2><h2>Level = {level}</h2><h2>Heigh Score: {highScore}</h2></div>
            </header>
            <div className="container">
                <div className={`box1 box ${flash("box1")}`} id = "box1" onClick={userMove}></div>
                <div className={`box2 box ${flash("box2")}`} id = "box2" onClick={userMove}></div>
                <div className={`box3 box ${flash("box3")}`} id = "box3" onClick={userMove}></div>
                <div className={`box4 box ${flash("box4")}`} id = "box4" onClick={userMove}></div>
            </div>
        </div>
    );
}