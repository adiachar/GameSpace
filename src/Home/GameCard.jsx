import * as React from 'react';
import { Button } from '@mui/material';
import "./GameCard.css";

export default function GameCard({gameName, gameDescription, img, background, handleClick, scrollLeft, scrollRight}){
    return(
        <div className="GameContainer">
            <div className="gameContainer" style={{backgroundColor: background, width: "`100vw"}}>
                <div className="game">
                    <div className="gameDtl">
                        <h1>{gameName}</h1>
                        <p>{gameDescription}</p>
                    </div>
                    <div className="image">
                        <img src={img} alt="" />
                    </div>
                </div>   
                <div className='btns'>
                    {scrollLeft && <Button variant='outlined' color="light" onClick={scrollLeft} className='btn'>prev</Button>} 
                    <Button variant='contained' color='light' size='large' onClick={() => handleClick(gameName)} className='play'>Play</Button>
                    {scrollRight && <Button variant='outlined' color="light" onClick={scrollRight} className='btn'>next</Button>}       
                </div>
            </div>
        </div>
    );
}