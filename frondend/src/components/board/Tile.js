import React from 'react';
import './Tile.css';

const Tile = ({ name, type }) => {
    return (
        <div className={`tile ${type}`}>
            <span>{name}</span>
        </div>
    );
};

export default Tile;
