import {useState, useEffect, useRef} from 'react';
import {motion} from "framer-motion";
import {Button} from "@mui/material";

import tbs from "./Traceback.module.css";

let actions = [+10, -5, +20, -10];
let actionMatrix = [];
let tempMemory = [];
let memory = [];
let timeInterval;
let aiChooseInterval;
const maxRounds = 3;
let chooseRandom = true;
const aiChooseSpeed = 3000;

export default function Traceback() {

    const [userChoices, setUserChoices] = useState([]);
    const [aiChoices, setAiChoices] = useState([]);
    const userChoicesRef = useRef(userChoices);
    const aiChoicesRef = useRef(aiChoices);
    const [round, setRound] = useState(0);
    const [userPoint, setUserPoint] = useState(0);
    const [aiPoint, setAiPoint] = useState(0);
    const [time, setTime] = useState(30);
    const [showRound, setShowRound] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [start, setStart] = useState(false);

    const createGameMatrix = () => {
        actionMatrix = Array.from({length: 6}, (_, row) => Array.from({length: 6}, (_, col) => actions[Math.floor(Math.random() * actions.length)]));
    }


    useEffect(() => {
        if (start === true) {
            createGameMatrix();
            updateRound();
        }
    }, [start]);

    useEffect(() => {
        userChoicesRef.current = userChoices;
        aiChoicesRef.current = aiChoices;
    }, [userChoices, aiChoices]);

    useEffect(() => {
        if (tempMemory.length > 0) {
            chooseRandom = false;
        }
    }, [round]);

    useEffect(() => {
        if(time == 0) {
            clearInterval(timeInterval);
            clearInterval(aiChooseInterval);
            setTimeout(() => updateRound(), 1000);
        }
    }, [time]);

    const isChoosedByUser = (row, col) => {
        return userChoices.some(obj => (obj.r === row && obj.c === col));
    }

    const isChoosedByAi = (row, col) => {
        return aiChoices.some(obj => (obj.r === row && obj.c === col));
    }

    const isRegistered = (row, col) => {
        return memory.some(obj => (obj.r === row && obj.c === col));
    }

    const handleChoice = (row, col, isUser = true) => {

        for (let obj of userChoicesRef.current) {
            if (obj.r === row && obj.c === col) {

                if(!isUser) {
                    return makeAiChoose();
                }
                return;
            }
        }

        for (let obj of aiChoicesRef.current) {
            if (obj.r === row && obj.c === col) {

                if(!isUser) {
                    return makeAiChoose();
                }
                return;
            }
        }

        if (isUser) {
            setUserPoint(up => up + actionMatrix[row][col]);
            setUserChoices(uc => [...uc, {r: row, c: col}]);

        } else {
            setAiPoint(ap => ap + actionMatrix[row][col]);
            setAiChoices(ac => [...ac, {r: row, c: col}]);
        }

        if (actionMatrix[row][col] > 0 && !isRegistered(row, col)) {
            memory.push({r: row, c: col});
        }
    }

    const startTimer = () => {
        timeInterval = setInterval(() => {
            setTime(t => {
                return t - 1;
            });
        }, 1000);
    }

    const updateRound = () => {
        if (round == maxRounds) {
            clearInterval(timeInterval);
            clearInterval(aiChooseInterval);
            setShowResult(true);
            setUserChoices([]);
            setAiChoices([]);
            setRound(0);
            setTimeout(() => {
                setShowResult(false);
                setStart(false);
            }, 3000);
            return;
        }
        
        setRound(r => r + 1);
        setUserChoices([]);
        setAiChoices([]);
        setShowRound(true);
        tempMemory = memory.slice();
        setTime(30);

        setTimeout(() => {
            setShowRound(false);
            startTimer();
            aiChooseInterval = setInterval(() => {
                makeAiChoose();
            }, aiChooseSpeed);
        }, 3000);
    }

    const makeAiChoose = () => {
        if (chooseRandom) {
            let randomSelection = {r: Math.floor(Math.random() * 6), c: Math.floor(Math.random() * 6)};
            handleChoice(randomSelection.r, randomSelection.c, false);

        } else {

            if (tempMemory.length == 0) {
                chooseRandom = true;
                return makeAiChoose();
            }

            let choice = tempMemory.pop();
            handleChoice(choice.r, choice.c, false);
        }
    }

    return (
        <div className={tbs.container}>
            {!start && <GetStarted setStart={setStart}/>}
            {showRound && <Rounds round={round}/>}
            {showResult && <Result isUserWon={userPoint > aiPoint}/>}
            <div className={tbs.header}>
                <div className={tbs.userPointDiv}>
                    <h3>YOU</h3>
                    <h3 className={tbs.userPoint}>{userPoint}</h3>
                </div>
                <div className={tbs.center}>
                    <h1>Traceback</h1>
                </div>
                <div className={tbs.aiPointDiv}>
                    <h3>AI</h3>
                    <h3 className={tbs.aiPoint}>{aiPoint}</h3>
                </div>
                <div className={tbs.timeDiv}>
                    <p>Round {round} ends in</p>
                    <h3 className={tbs.time}>{time}</h3>
                </div>
            </div>
            <div className={tbs.board}>
                {actionMatrix.map((boxes, row) => 
                    boxes.map( (val, col) => {
                        let isChoosenByUser = isChoosedByUser(row, col);
                        let isChoosenByAi = isChoosedByAi(row, col);

                        return (
                        <motion.div 
                            onClick={() => handleChoice(row, col)}  
                            className={`
                                ${tbs.box} 
                                ${(isChoosenByUser || isChoosenByAi) && (val < 0 ? tbs.redBorder : tbs.greenBorder)} 
                                ${isChoosenByUser ? tbs.userChoice : isChoosenByAi && tbs.aiChoice}
                            `}
                            key={`${row}${col}`}
                            whileHover={{
                                scale: 1.1
                            }}
                            transition={{duration: 0.3, ease: "easeInOut"}}
                        >
                            <motion.h1
                                whileInView={{
                                    scale: 1.1,
                                }}
                                className={val < 0 ? tbs.red : tbs.green}
                                style={{display: (isChoosenByUser || isChoosenByAi) ? "block" : "none"}}
                            >{val}</motion.h1>
                        </motion.div>
                    )}))}
            </div>
        </div>
    );
}


function Rounds({round}) {
    return (
        <div className={tbs.roundsComponent}>
            <motion.div 
                className={tbs.roundsDiv}
            >
                <motion.h1
                    className={tbs.roundsH1}
                    animate={{
                        scale: 1.3
                    }}
                    transition={{duration: 0.2, ease: "easeIn"}}
                >
                    ROUND {round}
                </motion.h1>
            </motion.div>
        </div>
    );
}

function Result({isUserWon}) {
    return (
        <div className={tbs.roundsComponent}>
            <motion.div 
                className={tbs.roundsDiv}
            >
                <motion.h1
                    className={tbs.roundsH1}
                    animate={{
                        scale: 1.3
                    }}
                    transition={{duration: 0.2, ease: "easeIn"}}
                >
                    {isUserWon ? "You Won!" : "You Lost! Better Luck next time."}
                </motion.h1>
            </motion.div>
        </div>
    );
}

function GetStarted({setStart}) {
    return (
        <div className={tbs.roundsComponent}>
            <div className={tbs.gameInfo}>
                <p>Game Intro: Mind vs Memory</p>
                <p>Welcome to Mind vs Memory, a thrilling battle of intuition vs intelligence! Are you smarter than an AI with perfect memory? Let’s find out!</p>
                <p>How to Play:</p>

                <p>The game is played on a hidden grid of cells.</p>

                <p>There are 3 rounds, and in each round, both you and the AI will take turns selecting cells.</p>

                <p>Each cell holds a random point value: +10, -10, +20, or -5.</p>

                <p>Cell positions and their values remain the same throughout all 3 rounds — but they’re hidden from both you and the AI.</p>

                <p>The AI uses memory to remember the best cells it selected previously.</p>

                <p>You use your brain to observe and remember which cells gave good results in the past rounds.</p>

                <p>Objective: Score the highest total points by the end of Round 3.</p>

                <p>Use your mind to beat the AI’s memory and prove your strategy is sharper!</p>

                    <Button 
                        variant='contained' 
                        size='medium' 
                        onClick={() => setStart(true)} 
                        className={tbs.btnPlay} 
                        style={{ 
                            backgroundColor: '#4CAF50', 
                            color: 'white', 
                            fontWeight: 'bold', 
                            borderRadius: '20px', 
                            padding: '10px 20px', 
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
                            transition: 'transform 0.2s', 
                        }}
                        onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        Play
                    </Button>
            </div>
        </div>
    )
}