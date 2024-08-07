import React, { useEffect, useState } from 'react';
import axios from '../../api/api';

const PlayerInfo = ({ playerId }) => {
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        if (!playerId) {
            console.error('No playerId provided');
            return;
        }

        const fetchPlayerDetails = async () => {
            try {
                const response = await axios.get(`/api/players/${playerId}/`);
                setPlayer(response.data);
            } catch (error) {
                console.error('Error fetching player details:', error);
            }
        };

        fetchPlayerDetails();
    }, [playerId]);

    if (!playerId) {
        return <div>Error: No playerId provided</div>;
    }

    return (
        <div>
            {player ? (
                <div>
                    <h2>Player Info</h2>
                    <p>Name: {player.name}</p>
                    <p>Balance: ${player.balance}</p>
                </div>
            ) : (
                <div>Loading player data...</div>
            )}
        </div>
    );
};

export default PlayerInfo;
