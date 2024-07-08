import React from 'react';
import './TitleDeed.css';

const TitleDeed = ({ name, owner, houses, hotel, color_group, house_cost, hotel_cost, mortgage, rent, rent_with_house, rent_with_hotel }) => {
    return (
        <div className="title-deed">
            <h2 className="title-deed-name">{name}</h2>
            <div><strong>Owner:</strong> {owner ? owner : 'No owner'}</div>
            <div><strong>Houses:</strong> {houses}</div>
            <div><strong>Hotel:</strong> {hotel ? 'Yes' : 'No'}</div>
            <div><strong>Color Group:</strong> {color_group}</div>
            <div><strong>House Cost:</strong> ${house_cost}</div>
            <div><strong>Hotel Cost:</strong> ${hotel_cost}</div>
            <div><strong>Mortgage:</strong> ${mortgage}</div>
            <div><strong>Rent:</strong> ${rent}</div>
            <div><strong>Rent with House:</strong> ${rent_with_house}</div>
            <div><strong>Rent with Hotel:</strong> ${rent_with_hotel}</div>
        </div>
    );
};

export default TitleDeed;
