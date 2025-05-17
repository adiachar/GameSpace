import React from 'react';
import { useRef } from "react";
import GameCard from "./GameCard";
import earthboundImg from "./assets/BlackHole.jpg";
import simonSayGameImg from "./assets/SimonSay.jpg";
import stonePaperScissorGameImg from "./assets/RockPaperScissor.jpg";
import snakeGameImg from "./assets/snake.jpg";

import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home(){
    const containerRef = useRef(null);
    const navigate = useNavigate();

    return(
        <div className="HomeWrapper">
            <div ref={containerRef} className="Home">
                <GameCard gameName="Earthbound" img={earthboundImg} handleClick={() => navigate("/earthbound")} />
                <GameCard gameName="Simon Say Game" img={simonSayGameImg} handleClick={() => navigate("/simon-say")} />
                <GameCard gameName="Stone Paper Scissor" img={stonePaperScissorGameImg} handleClick={() => navigate("/stone-paper-scissor")} />
                <GameCard gameName="Snake" img={snakeGameImg} handleClick={() => navigate("/snake")} />
            </div>
        </div>
    );
}