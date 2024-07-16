import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import PlayerIcon from '../board/PlayerIcon';
import DiceRoller from '../Dice/DiceRoller';
import './Board.css';
import { fetchBoard } from '../../api/api';
import avatar1 from '../../assets/avatars/avatar1.png';
import avatar2 from '../../assets/avatars/avatar2.png';
import avatar3 from '../../assets/avatars/avatar3.png';
import avatar4 from '../../assets/avatars/avatar4.png';
import avatar5 from '../../assets/avatars/avatar5.png';
import avatar6 from '../../assets/avatars/avatar6.png';

const Board = () => {
    const [boardTiles, setBoardTiles] = useState([]);
    const [error, setError] = useState(null);
    const [playerPositions, setPlayerPositions] = useState([0, 0, 0, 0, 0, 0]);
    const [currentPlayer, setCurrentPlayer] = useState(0);

    useEffect(() => {
        const getBoardData = async () => {
            try {
                const data = await fetchBoard();
                if (data && Array.isArray(data)) {
                    // Filter tiles to keep only 0-39 and sort by position
                    const sortedTiles = data
                        .filter(tile => tile.position >= 0 && tile.position <= 39)
                        .sort((a, b) => a.position - b.position);
                    setBoardTiles(sortedTiles);
                } else {
                    setError('Board data is not in the expected format');
                }
            } catch (error) {
                setError('Error fetching board data');
            }
        };

        getBoardData();
    }, []);

    const movePlayer = (playerIndex, steps) => {
        setPlayerPositions(prevPositions =>
            prevPositions.map((pos, index) =>
                index === playerIndex ? (pos + steps) % 40 : pos
            )
        );
    };

    const handleRollDice = (totalSteps) => {
        movePlayer(currentPlayer, totalSteps);
        setCurrentPlayer((prevPlayer) => (prevPlayer + 1) % 6);
    };

    if (error) {
        return <div>{error}</div>;
    }

    const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

    return (
        <div className="game-container">
            <div className="board">
                {boardTiles.map((tile) => (
                    <div key={tile.position} className={`tile tile-${tile.position}`}>
                        <Tile {...tile}>
                            {playerPositions.map((position, index) => 
                                position === tile.position && (
                                    <PlayerIcon 
                                        key={index}
                                        avatar={avatars[index]} 
                                        playerNumber={index + 1} 
                                    />
                                )
                            )}
                        </Tile>
                    </div>
                ))}
            </div>
            <div className="dice-container">
                <DiceRoller onRoll={handleRollDice} currentPlayer={currentPlayer} />
            </div>
        </div>
    );
};

export default Board;
