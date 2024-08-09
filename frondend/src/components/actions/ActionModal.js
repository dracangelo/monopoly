import React, { useState } from 'react';
import './ActionModal.css';

const ActionModal = ({ tile, player, onClose, onBuyProperty, onPayRent, onMortgageProperty, onSellProperty, onDrawCard }) => {
    const [selectedAction, setSelectedAction] = useState(null);

    const renderActionDescription = () => {
        switch (tile.tile_type) {
            case 'property':
                if (tile.property && tile.property.owner && tile.property.owner !== player.name) {
                    return `You must pay ${tile.property.owner} $${tile.property.rent} in rent for landing on ${tile.name}.`;
                } else if (tile.property && !tile.property.owner) {
                    const price = tile.property.price !== undefined ? `$${tile.property.price}` : 'an undefined amount';
                    return `You can buy ${tile.name} for ${price}.`;
                } else {
                    return `You already own ${tile.name}.`;
                }
            case 'mortgage':
                return `You can mortgage ${tile.name}.`;
            case 'chance':
            case 'community':
                return onDrawCard();
            default:
                return null;
        }
    };

    const handleAction = () => {
        if (selectedAction === 'buy') {
            onBuyProperty(tile);
        } else if (selectedAction === 'payRent') {
            onPayRent(tile);
        } else if (selectedAction === 'mortgage') {
            onMortgageProperty(tile);
        } else {
            onClose();
        }
    };

    return (
        <div className="action-modal">
            <h2>Action for {tile.name}</h2>
            <p>{renderActionDescription()}</p>

            {tile.tile_type === 'property' && !tile.property?.owner && (
                <div>
                    <button onClick={() => setSelectedAction('buy')}>Buy</button>
                </div>
            )}

            {tile.tile_type === 'property' && tile.property?.owner && tile.property.owner !== player.name && (
                <div>
                    <button onClick={() => setSelectedAction('payRent')}>Pay Rent</button>
                </div>
            )}

            <div>
                <button onClick={() => setSelectedAction('mortgage')}>Mortgage</button>
            </div>

            <div className="action-buttons">
                <button onClick={handleAction} disabled={!selectedAction}>
                    Confirm
                </button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ActionModal;
