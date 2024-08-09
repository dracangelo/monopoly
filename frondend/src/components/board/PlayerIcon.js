import React from 'react';

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

    const style = {
        ...positionStyles[position],
        width: '40px', // Make the icons a fixed size for visibility
        height: '40px',
        backgroundColor: '#f1f1f1', // Fallback color if avatar is missing
        backgroundImage: player.avatar ? `url(${player.avatar})` : null,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '50%', // Make it a circle
        border: '2px solid black',
        zIndex: playerNumber,
        position: 'absolute', // Ensure it's positioned correctly
    };

    return (
        <div className="player-icon" style={style} title={player.name}></div>
    );
};

export default PlayerIcon;
