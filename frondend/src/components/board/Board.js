import React, { useState, useEffect } from 'react';
import { fetchTiles } from '../../api/api';
import PlayerInfo from '../player/PlayerInfo';
import ActionModal from '../actions/ActionModal';
import StockCard from '../actions/StockCard';
import './Board.css';

const Board = ({ players = [] }) => {
    const [tiles, setTiles] = useState([]);
    const [playerPositions, setPlayerPositions] = useState([]);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [selectedTile, setSelectedTile] = useState(null);
    const [showActionModal, setShowActionModal] = useState(false);
    const [showStockCard, setShowStockCard] = useState(false);

    useEffect(() => {
        const getTiles = async () => {
            try {
                const data = await fetchTiles();
                const filteredTiles = data.filter(tile => tile.id >= 0 && tile.id < 40);
                setTiles(filteredTiles);
            } catch (error) {
                console.error("Error fetching tiles", error);
            }
        };

        getTiles();
    }, []);

    useEffect(() => {
        setPlayerPositions(players.map(() => 0));
    }, [players]);

    const handleTileClick = (tile) => {
        setSelectedTile(tile);
        setShowActionModal(true);
    };

    const closeActionModal = () => {
        setShowActionModal(false);
        setSelectedTile(null);
    };

    const closeStockCard = () => {
        setShowStockCard(false);
    };

    const handleRollDice = (roll) => {
        const newPosition = (playerPositions[currentPlayerIndex] + roll) % tiles.length;
        const newPositions = [...playerPositions];
        newPositions[currentPlayerIndex] = newPosition;
        setPlayerPositions(newPositions);

        const tile = tiles[newPosition];
        handleTileClick(tile);

        // Move to the next player's turn
        setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
    };

    const renderTile = (tile, index) => {
        return (
            <div key={index} className={`tile position-${tile.position}`} onClick={() => handleTileClick(tile)}>
                <div className={`property-color ${tile.color_group?.toLowerCase().replace(' ', '-')}`}></div>
                <div>{tile.name}</div>
                <div>Rent: ${tile.rent}</div>
                {tile.house_count > 0 && [...Array(tile.house_count)].map((_, i) => (
                    <div key={i} className="house"></div>
                ))}
                {tile.hotel_count > 0 && <div className="hotel"></div>}
                {playerPositions.includes(index) && (
                    <div className="players">
                        {players.map((player, playerIndex) => {
                            if (playerPositions[playerIndex] === index) {
                                return <div key={player.id} className={`player player-${playerIndex + 1}`}></div>;
                            }
                            return null;
                        })}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div>
            <div className="board">
                {tiles.map((tile, index) => renderTile(tile, index))}
            </div>
            <div className="player-info-container">
                {players.map((player, index) => (
                    <PlayerInfo key={player.id} player={player} position={playerPositions[index]} />
                ))}
            </div>
            {showActionModal && selectedTile && (
                <ActionModal
                    tile={selectedTile}
                    player={players[currentPlayerIndex]}
                    onClose={closeActionModal}
                />
            )}
            {showStockCard && (
                <StockCard onClose={closeStockCard} />
            )}
            <button onClick={() => handleRollDice(Math.floor(Math.random() * 6) + 1)}>Roll Dice</button>
        </div>
    );
};

export default Board;
