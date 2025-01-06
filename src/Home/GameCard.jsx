import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import "./GameCard.css";

export default function GameCard({img, GameName, GameDescription}){
    return(
        <div className="GameCard">
            <Card sx={{ maxWidth: 345, height: 240, backgroundColor: "grey"}}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="140"
                    image={img}
                    alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                            {GameName}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {GameDescription}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
}