import { useRef } from "react";
import GameCard from "./GameCard";
import EarthboundImg from "./assets/BlackHole.jpg";
import SimonSayGameImg from "./assets/SimonSay.jpg";
import StonePaperScissorGameImg from "./assets/RockPaperScissor.jpg";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const EarthboundDesc = "The alien armada is closing in fast, and Earth's survival hangs by a thread. As the last pilot of teh Galactic Defense Fleet, You must navigate through black and white holes to outrun enemy interceptors to reach Earth before the invasion begins. Every second counts!";
const SimonsayGameDesc = "Challenge your memory and reflexes with our captivating Simon Says game. Follow the pattern of lights and sounds, and repeat the sequence to advance to higher levels. See how far you can go in this timeless game of skill and concentration. Perfect for players of all ages!";
const StonePaperScissorGameDesc = "Test your luck and strategy with our timeless Stone Paper Scissor game. Challenge a friend or play against the computer in this fast-paced game of decisions. Choose wisely between Stone, Paper, or Scissor and see if you can outsmart your opponent.";

export default function Home(){
    const containerRef = useRef(null);
    const navigate = useNavigate();

    function handleClick(gameName){
        if(gameName == "Earthbound: Final Flight"){
            navigate("/earthbound");
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
            <GameCard gameName="Earthbound: Final Flight" gameDescription={EarthboundDesc} img={EarthboundImg} background={"#499B3B"} handleClick={handleClick} scrollRight={scrollRight}/>
            <GameCard gameName="Simon Say Game" gameDescription={SimonsayGameDesc} img={SimonSayGameImg} background={"#3B619B"} handleClick={handleClick} scrollLeft={scrollLeft} scrollRight={scrollRight}/>
            <GameCard gameName="Stone Paper Scissor" gameDescription={StonePaperScissorGameDesc} img={StonePaperScissorGameImg} background={"#979B3B"} handleClick={handleClick} scrollLeft={scrollLeft}/>
        </div>
    );
}