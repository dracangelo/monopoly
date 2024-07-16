import React from 'react';
import './PlayerIcon.css';

const PlayerIcon = ({ avatar, playerNumber }) => {
    return (
        <div className="player-icon">
            <img src={avatar} alt={`Player ${playerNumber}`} />
        </div>
    );
};

export default PlayerIcon;
