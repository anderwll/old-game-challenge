import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './index.css';

interface winningInterface {
    sense: string
    combine: number[]
}

const winningCombinations: Array<winningInterface> = [
    { combine: [0,1,2], sense: 'horizontals' },
    { combine: [3,4,5], sense: 'horizontals' },
    { combine: [6,7,8], sense: 'horizontals' },

    { combine: [0,3,6], sense: 'verticals' },
    { combine: [1,4,7], sense: 'verticals' },
    { combine: [2,5,8], sense: 'verticals' },

    { combine: [0,4,8], sense: 'diagonals-1' },
    { combine: [2,4,6], sense: 'diagonals-2' }
];

const Home: React.FC = () => {
    const playerOne: string = '❌';
    const playerTwo: string = '⭕';
    const initialGamdeData: Array<number> = [0,0,0,0,0,0,0,0,0]

    const [gameData, setGameData] = useState(initialGamdeData);
    const [player, setPlayer] = useState(1);
    const [winner, setWinner] = useState<winningInterface>();
    const [endGame, setEndGame] = useState(false);

    useEffect(() => {
        if(!winner) {
            checkWinner();
        }

        if(!endGame) {
            checkEndGame();
        }
         return
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameData]);

    useEffect(() => {
        if(winner !== undefined) {
            setTimeout(() => { 
                alert('PARABÉNS VC GANHOUU! 🎉');
            }, 800);
            return
        }

        if(endGame) {
            alert('ACABOUU!! DEU VELHA 😪');
            return
        }

        return
    }, [winner, endGame])

    const handleClick = (indexClicked: number) => {
        if(winner) { return }
        
        if(gameData[indexClicked] !== 0) { return }

        const newGameData = [...gameData];
        newGameData[indexClicked] = player;
        setGameData(newGameData);
        
        setPlayer((valor) => valor === 1 ? 2 : 1);
    }

    const checkWinner= () => {
        if(winner) { return }

        winningCombinations.forEach((value, index) => {
            const { combine } = value;

            if(
                gameData[combine[0]] === 1 && 
                gameData[combine[1]] === 1 && 
                gameData[combine[2]] === 1
            ) {
                setWinner(winningCombinations[index])
            }

            if(
                gameData[combine[0]] === 2 && 
                gameData[combine[1]] === 2 && 
                gameData[combine[2]] === 2
            ) {
                setWinner(winningCombinations[index])
            }
        });
    }

    const checkEndGame = () => {
        const oldEnd = gameData.every((value) => value !== 0);

        if(oldEnd) {
            setEndGame(true);
        }
    }

    const restartGame = () => {
        setGameData(initialGamdeData);
        setPlayer(1);
        setWinner(undefined);
        setEndGame(false);
    }

    return (
        <div className='section'>
            <Typography variant="h2" color="#333" sx={{position: 'fixed', top: 0}}>OLD GAME</Typography>
            <div className='board-game'>
                {gameData.map((item, index) => 
                    <span 
                        key={index} 
                        onClick={() => handleClick(index)}
                        className={(winner?.combine.includes(index)) ? winner.sense : ''}
                    >
                        <abbr title=''>{index}</abbr>
                        {item === 1 && playerOne }
                        {item === 2 && playerTwo }
                    </span>
                )}  
            </div>
             <Button variant="contained" onClick={restartGame} sx={{position: 'fixed', bottom: 10, right: 10, zIndex: 999, p: 2, bgcolor: '#333'}}>
                Restart
            </Button>
        </div>
    );
};

export default Home;