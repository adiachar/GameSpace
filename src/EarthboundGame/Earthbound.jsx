import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ge from "./Earthbound.module.css";
import { accordionSummaryClasses } from "@mui/material";

const winDest = 39;
const blackHolePos = [4, 7, 11, 15, 17, 21, 30, 35];
const whiteHolePos = [2, 5, 9, 13, 19, 25, 28, 38];
let bwIdx = 0;

export default function GoEarth(){
    const navigate = useNavigate();
    const [start, setStart] = useState(false);
    const [playerPos, setPlayerPos] = useState(1);
    const [gamePos, setGamePos] = useState(1);
    const [boost, setBoost] = useState(true);
    const [alienMoveTime, setAlienMoveTime] = useState(5);
    const [charge, setCharge] = useState(100);

    useEffect(() => {
        if(start) {
            let interval = setInterval(() => {
                setAlienMoveTime((time) => {
                    if(time === 0) {
                        clearInterval(interval);
                        return 0;
                    }
                    return time - 1;
                });
            }, 1000);
        }
    }, [start]);

    useEffect(() => {
        if(alienMoveTime === 0 && start) {
            let interval = setInterval(() => {
                setGamePos((pos) => {
                    if(pos < winDest) {
                        return pos + 1;
                    } else {
                        clearInterval(interval);
                        setStart(false);
                        setGamePos(1);
                        setPlayerPos(1);
                        return pos;
                    }
                }); 
            }, 1500);
        }
    }, [alienMoveTime]);

    useEffect(() => {
        if(playerPos === winDest) {
            setStart(false);
        }
    }, [playerPos]);

    let play = () => {
        setStart(true);
        setBoost(true);
        setPlayerPos(1);
        setGamePos(1);
        setAlienMoveTime(5);
    }

    let exit = () => {
        navigate("/");
    }

    function makeMove(){
        if(!start || !boost) {
            return;
        }
        setBoost(false);
        setCharge(0);
        changePosition(playerPos + charge/25);
    }

    let changePosition = (destination) => {
        let interval = setInterval(() => {
            setPlayerPos((pos) => {
                if(pos < destination && pos < winDest) {
                    return pos + 1;
                }

                clearInterval(interval);
                setBoost(true);
                setCharge(25);
                reCharge();

                if(blackHolePos.includes(pos)) {
                    let random = Math.floor(Math.random() * whiteHolePos.length);
                    return whiteHolePos[random];
                }

                return pos;
                
            });
        }, 1000);
    }

    let reCharge = () => {
        let interval = setInterval(() => {
            setBoost(bst => {
                if(bst) {
                    setCharge(crg => {
                        if(crg === 100) {
                            clearInterval(interval);
                            return crg;
                        }
                        return crg + 25;
                    });
                    return bst;
                } else {
                    clearInterval(interval);
                    return bst;
                }
            });
        }, 1000);
    }

    return(
        <div className={ge.earthBound}>
            <div className={ge.header}>
                <div className={ge.mainHeader}>
                    <h1 className={ge.name}>Earthbound: Final Flight</h1>
                </div>
                <div className={ge.rightHeader}>
                    <p className={ge.status +" d-block text-center m-3"}>Alien's will start moving in</p>
                    <p className={ge.alienTime}>{alienMoveTime}</p>
                </div>
            </div>

            <div className={ge.main}>
                <div className={ge.board}>
                    {Array.from({ length: winDest }, (_, idx) => (
                        <div className={`${ge.box} ${idx + 1 === winDest && ge.win}`} key={idx}>
                            {blackHolePos.includes(idx + 1) && (<div className={ge.blackHole}></div>)}
                            {whiteHolePos.includes(idx + 1) && (<div className={ge.whiteHole}></div>)}
                            {playerPos === idx + 1 && (<div className={ge.player}>
                                <p>You</p>
                            </div>)}
                            {gamePos === idx + 1 && (<div className={ge.game}>
                                <p>Alien</p>
                            </div>)}
                        </div>
                    ))}
                </div>
                <div className={ge.boostContainer}>
                    <div className={ge.charge}>
                        <div className={ge.value} style={{width: `${charge + 1}%`}}></div>
                    </div>
                    <button onClick={makeMove} className={ge.boost}>Boost</button>            
                </div>
            </div>
            {!start && 
            (<div className={ge.startGame}>
                <div className={ge.options}>
                    <h1 className="m-3">Earthbound: Final Flight</h1>
                    {playerPos === winDest ? (
                    <div className={ge.playerWon}>
                        <h1>You Saved the World! Play again ?</h1>
                    </div>
                    ) : ( 
                        gamePos === winDest ? (
                        <div className={ge.playerWon}>
                            <h1>Game Over! try again ?</h1>
                        </div> ) : (
                        <div className={"col-12 text-center " +ge.gmInfo}>
                            <p className="p-3">Emergency Alert! Aliens are closing in on Earth. You are humanity’s last hope. 
                                Race through the cosmos, navigate deadly obstacles, and reach Earth before they do. 
                                The fate of the planet is in your hands!
                            </p>
                            <p className={ge.description}>The Aliens will start moving in 5 seconds!</p>
                        </div>
                        )
                        )}
                    <div className="col-12 d-flex justify-content-around mt-5">
                        <button onClick={play} className="btn btn-success col-5 p-3 rounded-pill">Play</button>
                        <button onClick={exit} className="btn btn-danger col-5 p-3 rounded-pill">Exit</button>
                    </div>
                </div>
            </div>)}  
        </div>
    );
}