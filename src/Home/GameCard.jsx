import * as React from 'react';
import { Button } from '@mui/material';
import gc from "./GameCard.module.css";

export default function GameCard({gameName, gameDescription, img, background, handleClick, scrollLeft, scrollRight}){
    return(
        <div className={gc.gameContainer}>
            <div className={gc.imageH}>
                <img src={img}/>
            </div>
            <div className={gc.gameDtl} style={{ textAlign: 'center', marginTop: '0' }}>
                <h1>{gameName}</h1>
            </div>
            <div className={gc.btns} style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '8px' }}>
                <Button 
                    variant='contained' 
                    size='medium' 
                    onClick={() => handleClick(gameName)} 
                    className={gc.btnPlay} 
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
    );
}