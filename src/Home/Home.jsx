import GameCard from "./GameCard";
import BlackHoleGameImg from "./assets/BlackHOle.jpg";
import SimonSayGameImg from "./assets/SimonSay.jpg";
import StonePaperScissorGameImg from "./assets/RockPaperScissor.jpg";
import "./Home.css";

const BlackHoleGameDesc = "This is an Advansed version of snake and ladder Game";
const SimonsayGameDesc = "This Game will test and improve your Memory Power";
const StonePaperScissorGameDesc = "Play with Computer to Pass your time in Luck";

export default function Home(){
    let item = 0;
    return(
        <div className="Home">
            <GameCard img={BlackHoleGameImg} GameName="Black And White Hole" GameDescription={BlackHoleGameDesc}/>
            <GameCard img={SimonSayGameImg} GameName="Simon Say Game" GameDescription={SimonsayGameDesc}/>
            <GameCard img={StonePaperScissorGameImg} GameName="Stone Paper Scissor" GameDescription={StonePaperScissorGameDesc}/>
        </div>
    );
}