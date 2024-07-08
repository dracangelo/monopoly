import React from 'react';
import './Tile.css';

const Tile = ({ name, position, space_type, property, onClick }) => {
    return (
        <div className={`tile ${space_type.toLowerCase()}`} onClick={onClick}>
            <div className="tile-name">{name}</div>
            {property && (
                <div className="tile-property">
                    <div><strong>Owner:</strong> {property.owner ? property.owner : 'No owner'}</div>
                    <div><strong>Rent:</strong> ${property.rent}</div>
                    <div><strong>Houses:</strong> {property.houses}</div>
                    <div><strong>Hotel:</strong> {property.hotel ? 'Yes' : 'No'}</div>
                    <div><strong>Color Group:</strong> {property.color_group}</div>
                    <div><strong>House Cost:</strong> ${property.house_cost}</div>
                    <div><strong>Hotel Cost:</strong> ${property.hotel_cost}</div>
                    <div><strong>Mortgage:</strong> ${property.mortgage}</div>
                    <div><strong>Rent with House:</strong> ${property.rent_with_house}</div>
                    <div><strong>Rent with Hotel:</strong> ${property.rent_with_hotel}</div>
                </div>
            )}
        </div>
    );
};

export default Tile;
