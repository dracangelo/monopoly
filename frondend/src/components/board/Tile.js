import React from 'react';
import './Tile.css';

const Tile = ({ name, type, color, rent }) => {
    return (
        <div className={`tile ${type}`}>
            {color && <div className="tile-top" style={{ backgroundColor: color }}></div>}
            <div className="tile-content">
                <div className="tile-name">{name}</div>
                {rent && <div className="tile-rent">{`Rent: $${rent}`}</div>}
            </div>
        </div>
    );
};

export default Tile;
