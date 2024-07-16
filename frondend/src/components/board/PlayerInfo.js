import React from 'react';
import PropTypes from 'prop-types';
import './PlayerInfo.css';

const PlayerInfo = ({ player }) => {
    return (
        <div className="player-info">
            <h2>{player.name}</h2>
            <p><strong>Balance:</strong> ${player.balance}</p>
            <p><strong>Properties:</strong> {player.properties.join(', ')}</p>
            <p><strong>Hotels:</strong> {player.hotels}</p>
            <p><strong>Mortgages:</strong> {player.mortgages.join(', ')}</p>
        </div>
    );
};

PlayerInfo.propTypes = {
    player: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
        properties: PropTypes.arrayOf(PropTypes.string).isRequired,
        hotels: PropTypes.number.isRequired,
        mortgages: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};

export default PlayerInfo;
