import React from 'react';
import './PlayerInfo.css';
import avatar1 from '../../assets/avatars/avatar1.png';
import avatar2 from '../../assets/avatars/avatar2.png';
import avatar3 from '../../assets/avatars/avatar3.png';
import avatar4 from '../../assets/avatars/avatar4.png';
import avatar5 from '../../assets/avatars/avatar5.png';
import avatar6 from '../../assets/avatars/avatar6.png';

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

const PlayerInfo = ({ player, position }) => {
    const avatarIndex = player.id - 1; // Assuming player.id is 1-based and matches the avatar index
    const avatar = avatars[avatarIndex] || avatars[0]; // Fallback to avatar1 if index is out of range

    return (
        <div className="player-info">
            <img src={avatar} alt={`Avatar of ${player.name}`} className="player-avatar" />
            <h3>{player.name}</h3>
            <p>Position: {position}</p>
            <p>Balance: ${player.balance}</p>
        </div>
    );
};

export default PlayerInfo;