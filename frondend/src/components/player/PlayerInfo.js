import React from 'react';
import './PlayerInfo.css';

const PlayerInfo = ({ player, mortgageProperty }) => {
    return (
        <div className="player-info">
            <h2>{player.name}</h2>
            <p><strong>Balance:</strong> ${player.balance}</p>
            <p><strong>Properties:</strong> {player.properties.join(', ')}</p>
            <p><strong>Mortgaged Properties:</strong> {player.mortgagedProperties.join(', ')}</p>
            <p><strong>Hotels:</strong> {player.hotels}</p>
            <div>
                {player.properties.map((property, index) => (
                    <button key={index} onClick={() => mortgageProperty({ name: property, mortgageValue: 200 })}>
                        Mortgage {property}
                    </button>
                ))}
            </div>
            {/* Add any other necessary player info */}
        </div>
    );
};

export default PlayerInfo;
