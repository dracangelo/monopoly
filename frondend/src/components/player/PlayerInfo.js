import React, { useEffect, useState } from 'react';
import api from '../../api/api';

const PlayerInfo = ({ playerId: propPlayerId }) => {
    const [playerId, setPlayerId] = useState(propPlayerId || null);
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        // If playerId is not passed as prop, set a default playerId
        if (!propPlayerId) {
            const defaultPlayerId = 1; // Replace this with your logic to determine the playerId
            setPlayerId(defaultPlayerId);
        }
    }, [propPlayerId]);

    useEffect(() => {
        if (!playerId) {
            console.error('No playerId provided');
            return;
        }

        const fetchPlayerDetails = async () => {
            try {
                console.log('Fetching player details for playerId:', playerId);
                const response = await api.get(`/api/players/${playerId}/`);
                setPlayer(response.data);
            } catch (error) {
                console.error('Error fetching player details:', error);
            }
        };

        fetchPlayerDetails();
    }, [playerId]);

    return (
        <div>
            {player ? (
                <div>
                    <h2>Player Info</h2>
                    {player.avatar && <img src={player.avatar} alt={`${player.name}'s avatar`} style={{ width: '100px', height: '100px' }} />}
                    <p>Name: {player.name}</p>
                    <p>Balance: ${player.balance}</p>
                    <p>Rent Owed: ${player.rentOwed}</p>
                    <p>Mortgage: ${player.mortgage}</p>
                    <p>Debts: ${player.debts}</p>
                    <div>
                        <label htmlFor="properties">Properties ({player.properties ? player.properties.length : 0}):</label>
                        <select id="properties">
                            {player.properties && player.properties.map(property => (
                                <option key={property.id} value={property.id}>
                                    {property.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            ) : (
                <div>Loading player data...</div>
            )}
        </div>
    );
};

export default PlayerInfo;
