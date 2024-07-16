import React from 'react';
import './PlayerAvatar.css';

const PlayerAvatar = ({ player }) => {
    return (
        <div className={`player-avatar player-${player.id}`}>
            {player.name}
        </div>
    );
};

export default PlayerAvatar;
