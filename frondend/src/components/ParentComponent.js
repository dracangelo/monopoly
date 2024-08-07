import React from 'react';
import PlayerInfo from './player/PlayerInfo';
import { PlayerProvider, usePlayer } from './PlayerContext';

const ParentComponent = () => {
    return (
        <PlayerProvider>
            <PlayerInformation />
        </PlayerProvider>
    );
};

const PlayerInformation = () => {
    const { playerId } = usePlayer();

    return (
        <div>
            <h1>Player Information</h1>
            {playerId ? <PlayerInfo playerId={playerId} /> : <div>Loading player information...</div>}
        </div>
    );
};

export default ParentComponent;
