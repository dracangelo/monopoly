import React from 'react';
import './PlayerInfo.css';

const PlayerInfo = ({ player }) => {
    if (!player) {
        return <div>Loading...</div>;
    }

    return (
        <div className="player-info">
            <img src={player.avatar} alt={`${player.name}'s avatar`} className="player-avatar" />
            <h3>{player.name}</h3>
            <p>Balance: ${player.balance}</p>
            <p>Properties: {player.properties ? player.properties.length : 0}</p>
            <p>Hotels: {player.hotels}</p>
            <p>Mortgaged Properties: {player.mortgagedProperties ? player.mortgagedProperties.length : 0}</p>
        </div>
    );
};

export default PlayerInfo;
