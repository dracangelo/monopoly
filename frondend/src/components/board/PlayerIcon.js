import React from 'react';
import './PlayerIcon.css';

const PlayerIcon = ({ player, position, playerNumber }) => {
    const positionStyles = {
        0: { bottom: '5%', right: '5%' },
        1: { bottom: '5%', right: '14%' },
        2: { bottom: '5%', right: '23%' },
        3: { bottom: '5%', right: '32%' },
        4: { bottom: '5%', right: '41%' },
        5: { bottom: '5%', right: '50%' },
        6: { bottom: '5%', right: '59%' },
        7: { bottom: '5%', right: '68%' },
        8: { bottom: '5%', right: '77%' },
        9: { bottom: '5%', right: '86%' },
        10: { bottom: '5%', left: '5%' },
        11: { bottom: '14%', left: '5%' },
        12: { bottom: '23%', left: '5%' },
        13: { bottom: '32%', left: '5%' },
        14: { bottom: '41%', left: '5%' },
        15: { bottom: '50%', left: '5%' },
        16: { bottom: '59%', left: '5%' },
        17: { bottom: '68%', left: '5%' },
        18: { bottom: '77%', left: '5%' },
        19: { bottom: '86%', left: '5%' },
        20: { top: '5%', left: '5%' },
        21: { top: '5%', left: '14%' },
        22: { top: '5%', left: '23%' },
        23: { top: '5%', left: '32%' },
        24: { top: '5%', left: '41%' },
        25: { top: '5%', left: '50%' },
        26: { top: '5%', left: '59%' },
        27: { top: '5%', left: '68%' },
        28: { top: '5%', left: '77%' },
        29: { top: '5%', left: '86%' },
        30: { top: '5%', right: '5%' },
        31: { top: '14%', right: '5%' },
        32: { top: '23%', right: '5%' },
        33: { top: '32%', right: '5%' },
        34: { top: '41%', right: '5%' },
        35: { top: '50%', right: '5%' },
        36: { top: '59%', right: '5%' },
        37: { top: '68%', right: '5%' },
        38: { top: '77%', right: '5%' },
        39: { top: '86%', right: '5%' },
    };

    const playerStyles = [
        { width: '10px', height: '10px', borderRadius: '50%', border: '2px solid blue' },
        { width: '15px', height: '15px', borderRadius: '10%', border: '2px solid green' },
        { width: '15px', height: '15px', borderRadius: '25%', border: '2px solid red' },
        { width: '15px', height: '15px', borderRadius: '5%', border: '2px solid yellow' },
        { width: '20px', height: '20px', borderRadius: '10%', border: '2px solid orange' },
        { width: '20px', height: '20px', borderRadius: '5%', border: '2px solid purple' },
    ];

    const style = {
        ...positionStyles[position],
        ...playerStyles[playerNumber - 1], // Use different styles for each player
        backgroundImage: `url(${player.avatar})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: playerNumber,
    };

    return (
        <div className="player-icon" style={style} title={player.name}></div>
    );
};

export default PlayerIcon;
