import React from 'react';
import './ActionModal.css';

const ActionModal = ({ tile, player, onClose }) => {
    const renderActionDescription = () => {
        switch (tile.tile_type) {
            case 'property':
                return `You can buy ${tile.name} for $${tile.property?.price}.`;
            case 'mortgage':
                return `You can mortgage ${tile.name} for $${tile.property?.mortgageValue}.`;
            case 'chance':
                return `Draw a chance card.`;
            case 'community':
                return `Draw a community chest card.`;
            case 'jail':
                return `Pay a fine of $50.`;
            case 'tax':
                return `Pay a tax of $200.`;
            case 'stocks':
                return `Buy shares for $100.`;
            case 'casino':
                return `Gamble for a chance to win or lose $100.`;
            default:
                return null;
        }
    };

    return (
        <div className="action-modal">
            <h2>Action for {tile.name}</h2>
            <p>{renderActionDescription()}</p>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default ActionModal;