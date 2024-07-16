import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import PlayerIcon from '../board/PlayerIcon';
import DiceRoller from '../Dice/DiceRoller';
import PlayerInfo from '../player/PlayerInfo'; // Import PlayerInfo
import ActionModal from '../actions/ActionModal'; // Import ActionModal
import './Board.css';
import { fetchBoard } from '../../api/api';
import avatar1 from '../../assets/avatars/avatar1.png';
import avatar2 from '../../assets/avatars/avatar2.png';
import avatar3 from '../../assets/avatars/avatar3.png';
import avatar4 from '../../assets/avatars/avatar4.png';
import avatar5 from '../../assets/avatars/avatar5.png';
import avatar6 from '../../assets/avatars/avatar6.png';

const initialPlayers = [
    { name: 'Player 1', balance: 1500, properties: [], hotels: 0, mortgagedProperties: [], avatar: avatar1 },
    { name: 'Player 2', balance: 1500, properties: [], hotels: 0, mortgagedProperties: [], avatar: avatar2 },
    { name: 'Player 3', balance: 1500, properties: [], hotels: 0, mortgagedProperties: [], avatar: avatar3 },
    { name: 'Player 4', balance: 1500, properties: [], hotels: 0, mortgagedProperties: [], avatar: avatar4 },
    { name: 'Player 5', balance: 1500, properties: [], hotels: 0, mortgagedProperties: [], avatar: avatar5 },
    { name: 'Player 6', balance: 1500, properties: [], hotels: 0, mortgagedProperties: [], avatar: avatar6 },
];

const Board = () => {
    const [boardTiles, setBoardTiles] = useState([]);
    const [error, setError] = useState(null);
    const [playerPositions, setPlayerPositions] = useState([0, 0, 0, 0, 0, 0]);
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [players, setPlayers] = useState(initialPlayers);
    const [showModal, setShowModal] = useState(false);
    const [currentTile, setCurrentTile] = useState(null);

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
        const newPosition = (playerPositions[playerIndex] + steps) % 40;
        setPlayerPositions(prevPositions =>
            prevPositions.map((pos, index) =>
                index === playerIndex ? newPosition : pos
            )
        );
    
        const landedTile = boardTiles.find(tile => tile.position === newPosition);
        if (landedTile) {
            setCurrentTile(landedTile);
            setShowModal(true);  // Show modal automatically
        }
    };
    

    const handleRollDice = (totalSteps) => {
        movePlayer(currentPlayer, totalSteps);
        setCurrentPlayer((prevPlayer) => (prevPlayer + 1) % 6);
    };

    const handleAction = (actionType) => {
        setPlayers(prevPlayers => {
            const updatedPlayers = [...prevPlayers];
            const player = updatedPlayers[currentPlayer];
            const property = currentTile.property || {};  // Ensure property is defined
    
            switch (actionType) {
                case 'buy':
                    if (property.price && player.balance >= property.price) {
                        player.balance -= property.price;
                        player.properties.push(currentTile.name);
                        property.owner = player.name; // Set owner
                    }
                    break;
                case 'mortgage':
                    if (property.mortgageValue) {
                        player.balance += property.mortgageValue;
                        player.mortgagedProperties.push(currentTile.name);
                        player.properties = player.properties.filter(p => p !== currentTile.name);
                    }
                    break;
                case 'chance':
                    // Implement draw chance card logic here
                    break;
                case 'community':
                    // Implement draw community card logic here
                    break;
                case 'payFine':
                    player.balance -= 50;
                    break;
                case 'payTax':
                    player.balance -= 200;
                    break;
                case 'buyShares':
                    player.balance -= 100;
                    break;
                case 'gamble':
                    player.balance += Math.random() > 0.5 ? 100 : -100;
                    break;
                default:
                    break;
            }
    
            return updatedPlayers;
        });
    };
    

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="game-container">
            <div className="board">
                {boardTiles.map((tile) => (
                    <div key={tile.position} className={`tile tile-${tile.position}`}>
                        <Tile {...tile} onAction={handleAction} />
                        {playerPositions.map((position, index) => 
                            position === tile.position && (
                                <PlayerIcon 
                                    key={index}
                                    avatar={players[index].avatar} 
                                    playerNumber={index + 1} 
                                />
                            )
                        )}
                    </div>
                ))}
            </div>
            <div className="dice-container">
                <DiceRoller onRoll={handleRollDice} currentPlayer={currentPlayer} />
            </div>
            <PlayerInfo player={players[currentPlayer]} mortgageProperty={handleAction} />
            {showModal && 
                <ActionModal 
                    tile={currentTile} 
                    player={players[currentPlayer]} 
                    onClose={() => setShowModal(false)} 
                    onAction={handleAction} 
                />
            }
        </div>
    );
};

export default Board;
