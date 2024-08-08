import React, { useState, useEffect } from 'react';
import PlayerInfo from './player/PlayerInfo';

const ParentComponent = () => {
    const [playerId, setPlayerId] = useState(null);

    useEffect(() => {
        // Simulating fetching the playerId
        const fetchPlayerId = () => {
            // Replace this logic with actual playerId fetching logic
            const id = 1;
            console.log('Setting playerId:', id); // Debug log
            setPlayerId(id);
        };

        fetchPlayerId();
    }, []);

    return (
        <div>
            <h1>Player Information</h1>
            {playerId ? <PlayerInfo playerId={playerId} /> : <div>Loading player information...</div>}
        </div>
    );
};

export default ParentComponent;
