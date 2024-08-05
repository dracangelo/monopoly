import React, { useState, useEffect } from 'react';
import { fetchBoard, fetchPlayers, fetchBank } from '../../api/api';
import PlayerInfo from '../player/PlayerInfo';
import ActionModal from '../actions/ActionModal';
import StockCard from '../actions/StockCard';
import DiceRoller from '../Dice/DiceRoller';
import './Board.css';
import Tile from './Tile';
import PlayerIcon from '../board/PlayerIcon';
import avatar1 from '../../assets/avatars/avatar1.png';
import avatar2 from '../../assets/avatars/avatar2.png';
import avatar3 from '../../assets/avatars/avatar3.png';
import avatar4 from '../../assets/avatars/avatar4.png';
import avatar5 from '../../assets/avatars/avatar5.png';
import avatar6 from '../../assets/avatars/avatar6.png';

const initialPlayers = [
    { id: 1, name: 'Player 1', balance: 1500, properties: [], hotels: 0, mortgagedProperties: [], avatar: avatar1 },
    { id: 2, name: 'Player 2', balance: 1500, properties: [], hotels: 0, mortgagedProperties: [], avatar: avatar2 },
    { id: 3, name: 'Player 3', balance: 1500, properties: [], hotels: 0, mortgagedProperties: [], avatar: avatar3 },
    { id: 4, name: 'Player 4', balance: 1500, properties: [], hotels: 0, mortgagedProperties: [], avatar: avatar4 },
    { id: 5, name: 'Player 5', balance: 1500, properties: [], hotels: 0, mortgagedProperties: [], avatar: avatar5 },
    { id: 6, name: 'Player 6', balance: 1500, properties: [], hotels: 0, mortgagedProperties: [], avatar: avatar6 },
];

const Board = () => {
    const [boardTiles, setBoardTiles] = useState([]);
    const [players, setPlayers] = useState(initialPlayers);
    const [bankBalance, setBankBalance] = useState(0);
    const [playerPositions, setPlayerPositions] = useState([0, 0, 0, 0, 0, 0]);
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [currentTile, setCurrentTile] = useState(null);
    const [showStockCard, setShowStockCard] = useState(false);

    useEffect(() => {
        const getBoardData = async () => {
            try {
                const data = await fetchBoard();
                setBoardTiles(data.filter(tile => tile.id >= 0 && tile.id < 40));
            } catch (error) {
                console.error('Error fetching board data:', error);
            }
        };

        const getPlayersData = async () => {
            try {
                const data = await fetchPlayers();
                setPlayers(data);
            } catch (error) {
                console.error('Error fetching players data:', error);
            }
        };

        const getBankBalance = async () => {
            try {
                const data = await fetchBank();
                setBankBalance(data.balance);
            } catch (error) {
                console.error('Error fetching bank balance:', error);
            }
        };

        getBoardData();
        getPlayersData();
        getBankBalance();
    }, []);

    const handleRoll = (totalRoll) => {
        const newPositions = [...playerPositions];
        newPositions[currentPlayer] = (newPositions[currentPlayer] + totalRoll) % boardTiles.length;
        setPlayerPositions(newPositions);
        setCurrentPlayer((currentPlayer + 1) % players.length);
    };

    const handleTileAction = (tile) => {
        setCurrentTile(tile);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setShowStockCard(false);
    };

    const openStockCard = () => {
        setShowStockCard(true);
    };

    return (
        <div className="game-container">
            <div className="bank-info">
                <h3>Bank Balance: ${bankBalance}</h3>
            </div>
            <div className="players-info">
                {players.map((player, index) => (
                    <PlayerInfo key={player.id} player={player} />
                ))}
            </div>
            <div className="board">
                {boardTiles.map((tile, index) => (
                    <Tile
                        key={index}
                        {...tile}
                        position={index}
                        onAction={handleTileAction}
                    />
                ))}
                {players.map((player, index) => (
                    <PlayerIcon 
                        key={player.id} 
                        player={player} 
                        position={playerPositions[index]}
                        playerNumber={index + 1}
                    />
                ))}
            </div>
            <DiceRoller currentPlayer={currentPlayer} setPlayerPositions={setPlayerPositions} onRoll={handleRoll} />
            {showModal && (
                <ActionModal
                    tile={currentTile}
                    player={players[currentPlayer]}
                    onClose={closeModal}
                    openStockCard={openStockCard}
                />
            )}
            {showStockCard && <StockCard onClose={closeModal} />}
        </div>
    );
};

export default Board;