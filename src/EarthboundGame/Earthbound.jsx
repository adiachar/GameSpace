import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ge from "./Earthbound.module.css";

const winDest = 16;
const blackHolePos = [4, 7, 11, 15];
const whiteHolePos = [2, 5, 9, 13];

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
                    if(time - 1 === 0) {
                        clearInterval(interval);
                        return 0;
                    }
                    return time - 1;
                });
            }, 1000);

            setTimeout(() => {
                let interval = setInterval(() => {
                    setGamePos(pos => {
                        if(pos == winDest) {
                            clearInterval(interval);
                            setStart(false);
                            return winDest;
                        }
                        return pos + 1;
                    })
                }, 1000);
            }, 5000);
        }
    }, [start]);

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
                if(blackHolePos.includes(pos)) {
                    let random = Math.floor(Math.random() * 4);
                    setPlayerPos(whiteHolePos[random]);
                }

                setBoost(true);
                setCharge(25);
                reCharge();
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
        <div className={ge.BlackAndWhite}>
            <div className={ge.header}>
                <div className={ge.mainHeader}>
                    <h1 className={ge.name}>Earthbound: Final Flight</h1>
                    <p className={ge.description +" " +"ms-5 me-5"}>
                    Emergency Alert! Aliens are closing in on Earth. You are humanity’s last hope. 
                    Race through the cosmos, navigate deadly obstacles, and reach Earth before they do. 
                    The fate of the planet is in your hands!
                    </p>
                </div>
                <div className={ge.rightHeader}>
                    <p className={ge.status +" d-block text-center m-3"}>Alien's will start moving in</p>
                    <p className={ge.alienTime}>{alienMoveTime}</p>
                </div>
            </div>

            <div className={ge.main}>
                <div className={ge.board}>
                    <div className={`${ge.box} ${ge.win}`}>
                        {blackHolePos.includes(16) && (<div className={ge.blackHole}></div>)}
                        {whiteHolePos.includes(16) && (<div className={ge.whiteHole}></div>)}
                        {playerPos === 16 && (<div className={ge.player}>
                            <p>You</p>
                        </div>)}
                        {gamePos === 16 && (<div className={ge.game}>
                            <p>Alien</p>
                        </div>)}
                    </div>
                    <div className={`${ge.box}`}>
                        {blackHolePos.includes(15) && (<div className={ge.blackHole}></div>)}
                        {whiteHolePos.includes(15) && (<div className={ge.whiteHole}></div>)}
                        {playerPos === 15 && (<div className={ge.player}>
                            <p>You</p>
                        </div>)}
                        {gamePos === 15 && (<div className={ge.game}>
                            <p>Alien</p>
                        </div>)}
                    </div>
                    <div className={`${ge.box}`}>
                        {blackHolePos.includes(14) && (<div className={ge.blackHole}></div>)}
                        {whiteHolePos.includes(14) && (<div className={ge.whiteHole}></div>)}
                        {playerPos === 14 && (<div className={ge.player}>
                            <p>You</p>
                        </div>)}
                        {gamePos === 14 && (<div className={ge.game}>
                            <p>Alien</p>
                        </div>)}
                    </div>
                    <div className={`${ge.box}`}>
                        {blackHolePos.includes(13) && (<div className={ge.blackHole}></div>)}
                        {whiteHolePos.includes(13) && (<div className={ge.whiteHole}></div>)}
                        {playerPos === 13 && (<div className={ge.player}>
                            <p>You</p>
                        </div>)}
                        {gamePos === 13 && (<div className={ge.game}>
                            <p>Alien</p>
                        </div>)}
                    </div>
                    <div className={`${ge.box}`}>
                        {blackHolePos.includes(9) && (<div className={ge.blackHole}></div>)}
                        {whiteHolePos.includes(9) && (<div className={ge.whiteHole}></div>)}
                        {playerPos === 9 && (<div className={ge.player}>
                            <p>You</p>
                        </div>)}
                        {gamePos === 9 && (<div className={ge.game}>
                            <p>Alien</p>
                        </div>)}
                    </div>
                    <div className={`${ge.box}`}>
                        {blackHolePos.includes(10) && (<div className={ge.blackHole}></div>)}
                        {whiteHolePos.includes(10) && (<div className={ge.whiteHole}></div>)}
                        {playerPos === 10 && (<div className={ge.player}>
                            <p>You</p>
                        </div>)}
                        {gamePos === 10 && (<div className={ge.game}>
                            <p>Alien</p>
                        </div>)}
                    </div>
                    <div className={`${ge.box}`}>
                        {blackHolePos.includes(11) && (<div className={ge.blackHole}></div>)}
                        {whiteHolePos.includes(11) && (<div className={ge.whiteHole}></div>)}
                        {playerPos === 11 && (<div className={ge.player}>
                            <p>You</p>
                        </div>)}
                        {gamePos === 11 && (<div className={ge.game}>
                            <p>Alien</p>
                        </div>)}
                    </div>
                    <div className={`${ge.box}`}>
                        {blackHolePos.includes(12) && (<div className={ge.blackHole}></div>)}
                        {whiteHolePos.includes(12) && (<div className={ge.whiteHole}></div>)}
                        {playerPos === 12 && (<div className={ge.player}>
                            <p>You</p>
                        </div>)}
                        {gamePos === 12 && (<div className={ge.game}>
                            <p>Alien</p>
                        </div>)}
                    </div>
                    <div className={`${ge.box}`}>
                        {blackHolePos.includes(8) && (<div className={ge.blackHole}></div>)}
                        {whiteHolePos.includes(8) && (<div className={ge.whiteHole}></div>)}
                        {playerPos === 8 && (<div className={ge.player}>
                            <p>You</p>
                        </div>)}
                        {gamePos === 8 && (<div className={ge.game}>
                            <p>Alien</p>
                        </div>)}
                    </div>
                    <div className={`${ge.box}`}>
                        {blackHolePos.includes(7) && (<div className={ge.blackHole}></div>)}
                        {whiteHolePos.includes(7) && (<div className={ge.whiteHole}></div>)}
                        {playerPos === 7 && (<div className={ge.player}>
                            <p>You</p>
                        </div>)}
                        {gamePos === 7 && (<div className={ge.game}>
                            <p>Alien</p>
                        </div>)}
                    </div>
                    <div className={`${ge.box}`}>
                        {blackHolePos.includes(6) && (<div className={ge.blackHole}></div>)}
                        {whiteHolePos.includes(6) && (<div className={ge.whiteHole}></div>)}
                        {playerPos === 6 && (<div className={ge.player}>
                            <p>You</p>
                        </div>)}
                        {gamePos === 6 && (<div className={ge.game}>
                            <p>Alien</p>
                        </div>)}
                    </div>
                    <div className={`${ge.box}`}>
                        {blackHolePos.includes(5) && (<div className={ge.blackHole}></div>)}
                        {whiteHolePos.includes(5) && (<div className={ge.whiteHole}></div>)}
                        {playerPos === 5 && (<div className={ge.player}>
                            <p>You</p>
                        </div>)}
                        {gamePos === 5 && (<div className={ge.game}>
                            <p>Alien</p>
                        </div>)}
                    </div>
                    <div className={`${ge.box}`}>
                        {blackHolePos.includes(1) && (<div className={ge.blackHole}></div>)}
                        {whiteHolePos.includes(1) && (<div className={ge.whiteHole}></div>)}
                        {playerPos === 1 && (<div className={ge.player}>
                            <p>You</p>
                        </div>)}
                        {gamePos === 1 && (<div className={ge.game}>
                            <p>Alien</p>
                        </div>)}
                    </div>
                    <div className={`${ge.box}`}>
                        {blackHolePos.includes(2) && (<div className={ge.blackHole}></div>)}
                        {whiteHolePos.includes(2) && (<div className={ge.whiteHole}></div>)}
                        {playerPos === 2 && (<div className={ge.player}>
                            <p>You</p>
                        </div>)}
                        {gamePos === 2 && (<div className={ge.game}>
                            <p>Alien</p>
                        </div>)}
                    </div>
                    <div className={`${ge.box}`}>
                        {blackHolePos.includes(3) && (<div className={ge.blackHole}></div>)}
                        {whiteHolePos.includes(3) && (<div className={ge.whiteHole}></div>)}
                        {playerPos === 3 && (<div className={ge.player}>
                            <p>You</p>
                        </div>)}
                        {gamePos === 3 && (<div className={ge.game}>
                            <p>Alien</p>
                        </div>)}
                    </div>
                    <div className={`${ge.box}`}>
                        {blackHolePos.includes(4) && (<div className={ge.blackHole}></div>)}
                        {whiteHolePos.includes(4) && (<div className={ge.whiteHole}></div>)}
                        {playerPos === 4 && (<div className={ge.player}>
                            <p>You</p>
                        </div>)}
                        {gamePos === 4 && (<div className={ge.game}>
                            <p>Alien</p>
                        </div>)}
                    </div>
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
                        <div className="col-12 text-center">
                            <p className="p-3">Emergency Alert! Aliens are closing in on Earth. You are humanity’s last hope. 
                                Race through the cosmos, navigate deadly obstacles, and reach Earth before they do. 
                                The fate of the planet is in your hands!
                            </p>
                            <p className={ge.description}>The Aliens will start moving in 5 seconds!</p>
                        </div>
                        )
                        )}
                    <div className="col-12 d-flex justify-content-around mt-5">
                        <button onClick={play} className="btn btn-success col-5 p-3">Play</button>
                        <button onClick={exit} className="btn btn-danger col-5 p-3">Exit</button>
                    </div>
                </div>
            </div>)}  
        </div>
    );
}