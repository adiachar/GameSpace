import { useRef } from "react";
import GameCard from "./GameCard";
import BlackHoleGameImg from "./assets/BlackHOle.jpg";
import SimonSayGameImg from "./assets/SimonSay.jpg";
import StonePaperScissorGameImg from "./assets/RockPaperScissor.jpg";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const BlackHoleGameDesc = "Welcome to the Ultimate Black & White Hole Adventure! Navigate the game board, avoid black holes, and teleport to white holes for a thrilling twist on classic Snake and Ladder. Challenge a friend or the computer for endless excitement!";
const SimonsayGameDesc = "Challenge your memory and reflexes with our captivating Simon Says game. Follow the pattern of lights and sounds, and repeat the sequence to advance to higher levels. See how far you can go in this timeless game of skill and concentration. Perfect for players of all ages!";
const StonePaperScissorGameDesc = "Test your luck and strategy with our timeless Stone Paper Scissor game. Challenge a friend or play against the computer in this fast-paced game of decisions. Choose wisely between Stone, Paper, or Scissor and see if you can outsmart your opponent.";

export default function Home(){
    const containerRef = useRef(null);
    const navigate = useNavigate();

    function handleClick(gameName){
        if(gameName == "Black And White Hole"){
            navigate("/blackAndWhiteHole");
        }else if(gameName == "Simon Say Game"){
            navigate("/simonSay");
        }else if(gameName == "Stone Paper Scissor"){
            navigate("/stonePaperScissor");
        }
    }

    let scrollLeft = () => {
        if(containerRef.current){
            containerRef.current.scrollLeft -= 1550;
        }
    }

    let scrollRight = () => {
        if(containerRef.current){
            containerRef.current.scrollLeft += 1550;
        }
    }
    
    return(
        <div ref={containerRef} className="Home">
            <GameCard GameName="Black And White Hole" GameDescription={BlackHoleGameDesc} img={BlackHoleGameImg} background={"#499B3B"} handleClick={handleClick} scrollRight={scrollRight}/>
            <GameCard GameName="Simon Say Game" GameDescription={SimonsayGameDesc} img={SimonSayGameImg} background={"#3B619B"} handleClick={handleClick} scrollLeft={scrollLeft} scrollRight={scrollRight}/>
            <GameCard GameName="Stone Paper Scissor" GameDescription={StonePaperScissorGameDesc} img={StonePaperScissorGameImg} background={"#979B3B"} handleClick={handleClick} scrollLeft={scrollLeft}/>
        </div>
    );
}