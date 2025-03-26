import * as React from 'react';
import { Button } from '@mui/material';
import gc from "./GameCard.module.css";

export default function GameCard({gameName, gameDescription, img, background, handleClick, scrollLeft, scrollRight}){
    return(
        <div className={gc.GameContainer}>
            <div className={gc.gameContainer} style={{backgroundColor: background, width: "`100vw"}}>
                <div className={gc.game}>
                    <div className={gc.gameDtl}>
                        <h1>{gameName}</h1>
                        <p>{gameDescription}</p>
                    </div>
                    <div className={gc.image}>
                        <img src={img} alt="" />
                    </div>
                </div>   
                <div className={gc.btns}>
                    {scrollLeft && <Button variant='contained' size='large' onClick={scrollLeft} className={gc.btnPrev}>prev</Button>} 
                    <Button variant='contained' size='large' onClick={() => handleClick(gameName)} className={gc.btnPlay}>Play</Button>
                    {scrollRight && <Button variant='contained' size='large' onClick={scrollRight} className={gc.btnNext}>next</Button>}       
                </div>
            </div>
        </div>
    );
}