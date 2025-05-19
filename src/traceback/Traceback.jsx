import {useState, useEffect} from 'react';
import {motion} from "framer-motion";

import tbs from "./Traceback.module.css";


let start = false;
let actions = [+10, -5, +20, -10];
let actionMatrix = Array.from({length: 6}, (_, row) => Array.from({length: 6}, (_, col) => actions[Math.floor(Math.random() * actions.length)]));
let timeInterval;
let aiChooseInterval;
const maxRounds = 3;
let chooseRandom = true;
const aiChooseSpeed = 3000;

export default function Traceback() {

    const [userChoices, setUserChoices] = useState([]);
    const [aiChoices, setAiChoices] = useState([]);
    const [memory, setMemory] = useState([]);
    const [round, setRound] = useState(0);
    const [userPoint, setUserPoint] = useState(0);
    const [aiPoint, setAiPoint] = useState(0);
    const [time, setTime] = useState(30);
    const [showRound, setShowRound] = useState(false);

    useEffect(() => {
        updateRound();
    }, []);

    useEffect(() => {

        console.log(chooseRandom);
        if(start == false) {
            return;
        }

        if (userChoices.length === 0) {
            return;
        }

        let userCurrChoice = actionMatrix[userChoices[userChoices.length - 1].r][userChoices[userChoices.length - 1].c]; 
        if(userCurrChoice > 0) {
            setMemory(m => [...m, {r: userChoices[userChoices.length - 1].r, c: userChoices[userChoices.length - 1].c}])
        }

        if (aiChoices.length === 0) {
            return;
        }

        let aiCurrChoice = actionMatrix[aiChoices[aiChoices.length - 1].r][aiChoices[aiChoices.length - 1].c]; 
        if(aiCurrChoice > 0) {
            setMemory(m => [...m, {r: aiChoices[aiChoices.length - 1].r, c: aiChoices[aiChoices.length - 1].c}])
        }

        if(userCurrChoice > 0) {
            setMemory(m => [...m, {r: userChoices[userChoices.length - 1].r, c: userChoices[userChoices.length - 1].c}])
        }

    }, [userChoices, aiChoices]);

    useEffect(() => {
        if(time == 0) {
            clearInterval(timeInterval);
            clearInterval(aiChooseInterval);
            setTimeout(() => updateRound(), 1000);
        }
    }, [time]);

    useEffect(() => {
        if (memory.length === 0) {
            chooseRandom = true;
        }
    }, [memory]);

    useEffect(() => {
        if (round >= 2 && memory.length != 0) {
            chooseRandom = false;
        }
    }, [round]);

    const isChoosedByUser = (row, col) => {
        return userChoices.some(obj => (obj.r === row && obj.c === col));
    }

    const isChoosedByAi = (row, col) => {
        return aiChoices.some(obj => (obj.r === row && obj.c === col));
    }

    const handleChoice = (row, col, isUser = true) => {
        let isChoosen = false;

        for (let uc of userChoices) {
            if (uc.r === row && uc.c === col) {
                isChoosen = true;
                break;
            }
        }

        if (!isChoosen) {
            for (let ac of aiChoices) {
                if (ac.r === row && ac.c === col) {
                    isChoosen = true;
                    break;
                }
            }
        }

        if (!isChoosen) {
            if (isUser) {
                setUserPoint(up => up + actionMatrix[row][col]);
                setUserChoices(uc => [...uc, {r: row, c: col}]);
            } else {
                setAiPoint(ap => ap + actionMatrix[row][col]);
                setAiChoices(ac => [...ac, {r: row, c: col}]);
            }
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
        if (round > 3) {
            return;
        }

        setRound(r => r + 1);
        start = true;
        setUserChoices([]);
        setAiChoices([]);
        setShowRound(true);
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
            let choice = {};
            setMemory(m => {
                choice = m.pop();
                return [...m];
            });
            handleChoice(choice.r, choice.c, false);
        }
    }

    return (
        <div className={tbs.container}>
            {showRound && <Rounds round={round}/>}
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
                    initial={{
                        y: 60
                    }}
                    animate={{
                        x: [0, 770, 770, 770, 1700],
                        y: [60, 60, 60, 60, 60]
                    }}
                    transition={{duration: 3, ease: "easeIn"}}
                >
                    ROUND {round}
                </motion.h1>
            </motion.div>
        </div>
    )
}