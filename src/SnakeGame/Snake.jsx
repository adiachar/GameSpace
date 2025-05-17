import { useEffect, useState } from "react";
import ArrowUp from '@mui/icons-material/KeyboardArrowUp';
import ArrowDown from '@mui/icons-material/KeyboardArrowDown';
import ArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import ArrowRight from '@mui/icons-material/KeyboardArrowRight';

import { Button } from "@mui/material";
import sc from "./Snake.module.css";

let snakeInterval;
let foodInterval;
let isGameOver = false;
let point = 0;
let currMovement;

let rowLength = 20;
let colLength = 20;

export default function Snake() {

    const [foodPos, setFoodPos] = useState({r: Math.floor(Math.random() * rowLength), c: Math.floor(Math.random() * colLength)});
    const [snakePos, setSnakePos] = useState([{r: 0, c: 2},{r: 0, c: 1},{r: 0, c: 0}]);
    const [status, setStatus] = useState("User Arrows to Start the game");

    const handleKeyPress = (currBtn) => {

        if (isGameOver === true) {
            point = 0;
            setSnakePos([{r: 0, c: 2},{r: 0, c: 1},{r: 0, c: 0}]);
            setStatus("User Arrows to Start the game");

            isGameOver = false;
            return;
        }

        if(currBtn === "ArrowRight") {
            if(currMovement === "left") {
                return;
            }

            clearInterval(snakeInterval);
            currMovement = "right";
            snakeInterval = setInterval(() => {
                setSnakePos(sp => {
                    return [{r: sp[0].r, c: ((sp[0].c + 1) % colLength)}, ...sp.slice(0, sp.length - 1)]
                });
            }, 100);

        } else if (currBtn === "ArrowLeft") {
            if(currMovement === "right") {
                return;
            }

            clearInterval(snakeInterval);
            currMovement = "left";
            snakeInterval = setInterval(() => {
                setSnakePos(sp => {
                    if (sp[0].c === 0) {
                        return [{r: sp[0].r, c: colLength - 1}, ...sp.slice(0, sp.length - 1)]
                    }
                    return [{r: sp[0].r, c: ((sp[0].c - 1) % colLength)}, ...sp.slice(0, sp.length - 1)]
                });
            }, 100);

        } else if (currBtn === "ArrowUp") {
            if(currMovement === "down") {
                return;
            }

            clearInterval(snakeInterval);
            currMovement = "up";
            snakeInterval = setInterval(() => {
                setSnakePos(sp => {
                    if (sp[0].r === 0) {
                        return [{r: rowLength - 1, c: sp[0].c}, ...sp.slice(0, sp.length - 1)]
                    }
                    return [{r: ((sp[0].r - 1) % rowLength), c: sp[0].c}, ...sp.slice(0, sp.length - 1)]
                });
            }, 100);

        } else if (currBtn === "ArrowDown") {
            if(currMovement === "up") {
                return;
            }

            clearInterval(snakeInterval);
            currMovement = "down";
            snakeInterval = setInterval(() => {
                setSnakePos(sp => {
                    return [{r: ((sp[0].r + 1) % rowLength), c: sp[0].c}, ...sp.slice(0, sp.length - 1)]
                });
            }, 100);
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", (e) => handleKeyPress(e.key));

        return () => window.removeEventListener("keydown", handleKeyPress);
    }, []);

    const createFoodInterval = () => {
        setFoodPos(fp => { return {...fp, r: Math.floor(Math.random()*20), c: Math.floor(Math.random()*20)}});
        clearInterval(foodInterval);
        foodInterval = setInterval(() => {
            setFoodPos(fp => { return {...fp, r: Math.floor(Math.random()*20), c: Math.floor(Math.random()*20)}});
        }, 10000);        
    }

    useEffect(() => {

        if (snakePos.slice(1).some(pos => ((JSON.stringify(pos.r) === JSON.stringify(snakePos[0].r)) && (JSON.stringify(pos.c) === JSON.stringify(snakePos[0].c))))) {
            clearInterval(snakeInterval);
            clearInterval(foodInterval);
            isGameOver = true;
            setStatus("Game Over!");
            setTimeout(() => {
                setStatus("Press any key to start the game again!");
            }, 1000);
        }

        if (snakePos[0].r === foodPos.r && snakePos[0].c === foodPos.c) {
            point += 1;
            setSnakePos(sp => {
                return [...sp.slice(0, sp.length), {r: sp[sp.length - 1].r - 1, c: sp[sp.length - 1].c}];
            });
            createFoodInterval();
        }
    }, [snakePos]);

    const isSnakeHere = (row, col, forUi = true) => {
        for (let pos of snakePos) {
            if (pos.r === row && pos.c === col) {
                return true;
            }
        }

        return false;
    }

    return (
        <div className={sc.container}>
            <div className={sc.header}>
                <div className={sc.left}>
                    <h3>Point</h3>
                    <h3 className={sc.point}>{point}</h3>
                </div>
                <div className={sc.center}>
                    <h1>Snake</h1>
                    <p>{status}</p>                    
                </div>
            </div>
            <div className={sc.board}> 
                {Array.from({length: 20}, (_, row) => Array.from({length: 20}, (_, col) => {
                    return (
                        <div 
                            key={`${row} + ${col}`}
                            className={`
                                ${sc.box} 
                                ${(foodPos.r === row && foodPos.c === col) && sc.food} 
                                ${isSnakeHere(row, col) && sc.snake}
                            `}>
                        </div>
                    )
                }))}
            </div>  
            <div className={sc.btns}>
                <div className={sc.btnUp}>
                    <Button variant="outlined" color="light" onClick={() => handleKeyPress("ArrowUp")}><ArrowUp /></Button>
                </div>
                <div className={sc.btnLR}>
                    <Button variant="outlined" color="light" onClick={() => handleKeyPress("ArrowLeft")}><ArrowLeft/></Button>
                    <Button variant="outlined" color="light" onClick={() => handleKeyPress("ArrowRight")}><ArrowRight/></Button>
                </div>
                <div className={sc.btnDown}>
                    <Button variant="outlined" color="light" onClick={() => handleKeyPress("ArrowDown")}><ArrowDown/></Button>
                </div>
            </div>          
        </div>
    );
}
