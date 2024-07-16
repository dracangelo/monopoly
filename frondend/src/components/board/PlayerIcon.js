// frontend/src/components/board/PlayerIcon.js

import React from 'react';
import './PlayerIcon.css';

const PlayerIcon = ({ position, avatar, playerNumber }) => {
    const gridPositions = [
        [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0],
        [10, 1], [10, 2], [10, 3], [10, 4], [10, 5], [10, 6], [10, 7], [10, 8], [10, 9], [10, 10],
        [9, 10], [8, 10], [7, 10], [6, 10], [5, 10], [4, 10], [3, 10], [2, 10], [1, 10], [0, 10],
        [0, 9], [0, 8], [0, 7], [0, 6], [0, 5], [0, 4], [0, 3], [0, 2], [0, 1]
    ];

    const [x, y] = gridPositions[position];

    const style = {
        transform: `translate(${x * 8.33}%, ${y * 8.33}%)`,  // Adjust the position based on the grid
        backgroundImage: `url(${avatar})`
    };

    return <div className={`player-icon player-${playerNumber}`} style={style}></div>;
};

export default PlayerIcon;
