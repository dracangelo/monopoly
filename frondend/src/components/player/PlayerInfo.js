import React from 'react';
import './PlayerInfo.css';

const PlayerInfo = ({ player, position }) => {
    return (
        <div className="player-info">
            <h3>{player.name}</h3>
            <p>Position: {position}</p>
            <p>Balance: ${player.balance}</p>
        </div>
    );
};

export default PlayerInfo;
