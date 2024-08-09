import React from 'react';
import './Tile.css';

const Tile = ({ name, position, tile_type = 'unknown', property, onAction }) => {
    return (
        <div className={`tile ${tile_type.toLowerCase()}`} onClick={() => onAction(property, tile_type)}>
            <div className="tile-position">{position}</div>
            <div className="tile-name">{name}</div>
            {property && (
                <div className="tile-property">
                    <div><strong>Owner:</strong> {property.owner ? property.owner : 'No owner'}</div>
                    <div><strong>Price:</strong> ${property.price !== undefined ? property.price : 'N/A'}</div>
                    <div><strong>Rent:</strong> ${property.rent}</div>
                    <div><strong>Houses:</strong> {property.houses || 0}</div>
                    <div><strong>Hotel:</strong> {property.hotel ? 'Yes' : 'No'}</div>
                    <div><strong>Color Group:</strong> {property.color_group}</div>
                </div>
            )}
        </div>
    );
};

export default Tile;
