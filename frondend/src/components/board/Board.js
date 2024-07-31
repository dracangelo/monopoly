// frontend/src/components/board/Board.js
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

    const renderTile = (tile, index) => {
        const colorClass = tile.color_group ? tile.color_group.toLowerCase().replace(' ', '-') : '';
        return (
            <div key={index} className={`tile position-${tile.position}`}>
                {colorClass && <div className={`property-color ${colorClass}`}></div>}
                <div>{tile.name}</div>
                <div>Rent: ${tile.rent}</div>
                {playerPositions.map((position, playerIndex) =>
                    position === tile.position ? (
                        <div key={playerIndex} className={`player player-${playerIndex + 1}`}>
                            P{playerIndex + 1}
                        </div>
                    ) : null
                )}
                {tile.house_count > 0 && [...Array(tile.house_count)].map((_, i) => (
                    <div key={i} className="house"></div>
                ))}
                {tile.hotel_count > 0 && <div className="hotel"></div>}
            </div>
        );
    };

    return (
        <div className="board">
            {tiles.map((tile, index) => renderTile(tile, index))}
        </div>
    );
};

export default Board;
