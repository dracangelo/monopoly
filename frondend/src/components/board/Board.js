// frontend/src/components/board/Board.js
import React from 'react';
import './Board.css';

const Board = ({ playerPositions, boardTiles }) => {
    return (
        <div className="board">
            {boardTiles.map((tile, index) => (
                <div key={index} className="tile">
                    {tile.name}
                    {playerPositions.map((position, playerIndex) =>
                        position === index ? (
                            <div key={playerIndex} className={`player player-${playerIndex + 1}`}>
                                P{playerIndex + 1}
                            </div>
                        ) : null
                    )}
                </div>
            ))}
        </div>
    );
};

export default Board;
