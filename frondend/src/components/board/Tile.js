import React from 'react';
import './Tile.css';

const Tile = ({ name, position, tile_type = 'unknown', property, children }) => {
    return (
        <div className={`tile ${tile_type.toLowerCase()}`}>
            <div className="tile-position">{position}</div>
            <div className="tile-name">{name}</div>
            {property && (
                <div className="tile-property">
                    <div><strong>Owner:</strong> {property.owner ? property.owner : 'No owner'}</div>
                    <div><strong>Rent:</strong> ${property.rent}</div>
                    <div><strong>Houses:</strong> {property.houses}</div>
                    <div><strong>Hotel:</strong> {property.hotel ? 'Yes' : 'No'}</div>
                    <div><strong>Color Group:</strong> {property.color_group}</div>
                </div>
            )}
            {children}
        </div>
    );
};

export default Tile;
