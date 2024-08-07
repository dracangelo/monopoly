import React, { useEffect, useState } from 'react';
import axios from '../api/api';
import PropertyCard from './PropertyCard';
import { io } from 'socket.io-client'; 

const PlayerDashboard = () => {
    const [player, setPlayer] = useState(null);

    const fetchPlayerDetails = async () => {
        try {
            const response = await axios.get('/api/players/1/'); // Corrected endpoint
            setPlayer(response.data);
        } catch (error) {
            console.error("Error fetching player details:", error);
        }
    };

    useEffect(() => {
        fetchPlayerDetails();
    }, []);

    useEffect(() => {
        const socket = io('ws://localhost:8000/ws/game/');

        socket.on('message', (data) => {
            const message = JSON.parse(data);
            if (player && message.player_id === player.id) {
                switch (message.type) {
                    case 'balance_update':
                        setPlayer((prevPlayer) => ({
                            ...prevPlayer,
                            balance: message.balance,
                        }));
                        break;
                    case 'property_update':
                        setPlayer((prevPlayer) => ({
                            ...prevPlayer,
                            properties: message.properties,
                        }));
                        break;
                    case 'stock_update':
                        setPlayer((prevPlayer) => ({
                            ...prevPlayer,
                            stocks: message.stocks,
                        }));
                        break;
                    case 'gambling_result':
                        setPlayer((prevPlayer) => ({
                            ...prevPlayer,
                            balance: message.new_balance,
                        }));
                        break;
                    case 'mortgage_update':
                        setPlayer((prevPlayer) => ({
                            ...prevPlayer,
                            properties: message.properties,
                        }));
                        break;
                    default:
                        console.warn('Unknown message type:', message.type);
                }
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [player]);

    const handleEndTurn = async () => {
        try {
            await axios.post(`/api/players/1/end_turn/`); // Corrected endpoint
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
