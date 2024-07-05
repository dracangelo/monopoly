import React, { useEffect, useState } from 'react';
import axios from '../api/api';
import PropertyCard from './PropertyCard';
import StockMarket from './StockMarket';
import { io } from 'socket.io-client';

const PlayerDashboard = () => {
    const [player, setPlayer] = useState(null);

    const fetchPlayerDetails = async () => {
        try {
            const response = await axios.get('/players/1/');
            setPlayer(response.data);
        } catch (error) {
            console.error("Error fetching player details:", error);
        }
    };

    useEffect(() => {
        fetchPlayerDetails();

        const socket = io('ws://localhost:8000/ws/game/');
        socket.on('message', (data) => {
            const message = JSON.parse(data);
            if (message.type === 'balance_update' && message.player_id === player.id) {
                setPlayer((prevPlayer) => ({
                    ...prevPlayer,
                    balance: message.balance,
                }));
            }
            // Handle other types of updates (properties, stocks, etc.)
        });

        return () => {
            socket.disconnect();
        };
    }, [player]);

    const handleEndTurn = async () => {
        try {
            await axios.post(`/players/1/end_turn/`);
            fetchPlayerDetails();
        } catch (error) {
            console.error("Error ending turn:", error);
        }
    };

    return (
        <div>
            {player && (
                <div>
                    <h2>Player Dashboard</h2>
                    <p>Balance: ${player.balance}</p>
                    <h3>Properties</h3>
                    {player.properties.map(property => (
                        <PropertyCard key={property.id} propertyId={property.id} />
                    ))}
                    <h3>Stocks</h3>
                    {player.stocks.map(stock => (
                        <div key={stock.id}>
                            <p>{stock.name}: {stock.quantity} shares</p>
                        </div>
                    ))}
                    <button onClick={handleEndTurn}>End Turn</button>
                </div>
            )}
        </div>
    );
};

export default PlayerDashboard;
