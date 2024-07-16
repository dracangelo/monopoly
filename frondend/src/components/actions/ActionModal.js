import React from 'react';
import './ActionModal.css';

const ActionModal = ({ tile, player, onClose, onAction }) => {
    const handleBuyProperty = () => {
        onAction('buy');
        onClose();
    };

    const handleMortgageProperty = () => {
        onAction('mortgage');
        onClose();
    };

    const handleDrawChanceCard = () => {
        onAction('chance');
        onClose();
    };

    const handleDrawCommunityCard = () => {
        onAction('community');
        onClose();
    };

    const handlePayFine = () => {
        onAction('payFine');
        onClose();
    };

    const handlePayTax = () => {
        onAction('payTax');
        onClose();
    };

    const handleBuyShares = () => {
        onAction('buyShares');
        onClose();
    };

    const handleGamble = () => {
        onAction('gamble');
        onClose();
    };

    const renderActionButton = () => {
        switch (tile.tile_type) {
            case 'property':
                return (
                    <>
                        <button onClick={handleBuyProperty}>Buy Property</button>
                        <button onClick={handleMortgageProperty}>Mortgage Property</button>
                    </>
                );
            case 'chance':
                return <button onClick={handleDrawChanceCard}>Draw Chance Card</button>;
            case 'community':
                return <button onClick={handleDrawCommunityCard}>Draw Community Card</button>;
            case 'jail':
                return <button onClick={handlePayFine}>Pay Fine</button>;
            case 'tax':
                return <button onClick={handlePayTax}>Pay Tax</button>;
            case 'stocks':
                return <button onClick={handleBuyShares}>Buy Shares</button>;
            case 'casino':
                return <button onClick={handleGamble}>Gamble</button>;
            default:
                return null;
        }
    };

    return (
        <div className="action-modal">
            <h2>Action for {tile.name}</h2>
            {renderActionButton()}
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default ActionModal;
