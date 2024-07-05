import React from 'react';
import Tile from './Tile';
import './Board.css';

const Board = () => {
    // Define the board layout with tile names and types
    const tiles = [
        { name: 'Go', type: 'corner' },
        { name: 'Mediterranean Avenue', type: 'property' },
        { name: 'Community Chest', type: 'chest' },
        { name: 'Baltic Avenue', type: 'property' },
        { name: 'Income Tax', type: 'tax' },
        { name: 'Reading Railroad', type: 'railroad' },
        // Add other tiles here...
    ];

    return (
        <div className="board">
            {tiles.map((tile, index) => (
                <Tile key={index} name={tile.name} type={tile.type} />
            ))}
        </div>
    );
};

export default Board;
