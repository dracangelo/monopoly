import React, { useState, useEffect } from 'react';
import { fetchTiles } from '../../api/api';
import './Board.css';

const Board = ({ playerPositions }) => {
    const [tiles, setTiles] = useState([]);

    useEffect(() => {
        const getTiles = async () => {
            try {
                const data = await fetchTiles();
                const filteredTiles = data.filter(tile => tile.id >= 0 && tile.id < 40);  // Filter tiles with IDs 0 - 39
                setTiles(filteredTiles);
            } catch (error) {
                console.error("Error fetching tiles", error);
            }
        };

        getTiles();
    }, []);

    const renderTile = (tile, index) => (
        <div key={index} className={`tile position-${tile.position}`}>
            {tile.name}
            {playerPositions.map((position, playerIndex) =>
                position === tile.position ? (
                    <div key={playerIndex} className={`player player-${playerIndex + 1}`}>
                        P{playerIndex + 1}
                    </div>
                ) : null
            )}
        </div>
    );

    return (
        <div className="board">
            {tiles.map((tile, index) => renderTile(tile, index))}
        </div>
    );
};

export default Board;
