// PlayerIcon.js

import React from 'react';
import './PlayerIcon.css';

const PlayerIcon = ({ player, position, playerNumber }) => {
    return (
        <div className={`player-avatar player-position-${position}`}>
            <img src={player.avatar} alt={`Player ${playerNumber}`} />
        </div>
    );
};

export default PlayerIcon;
