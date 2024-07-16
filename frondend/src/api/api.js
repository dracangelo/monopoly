// api.js
import axios from 'axios';
import config from './config';

// Create an axios instance
const api = axios.create({
    baseURL: config.apiBaseUrl,  // Use the base URL from config
    timeout: 5000,  // Adjust the timeout as necessary
});

// Function to fetch the board
export const fetchBoard = async () => {
    try {
        const response = await api.get('/api/board/');
        return response.data;
    } catch (error) {
        console.error('Fetch board data error:', error);
        throw error;
    }
};


// Function to fetch players
export const fetchPlayers = async () => {
    try {
        const response = await api.get('/players/');
        return response.data;
    } catch (error) {
        console.error('Error fetching player data:', error);
        throw error;
    }
};

// Function to propose a trade
export const proposeTrade = async (tradeDetails) => {
    try {
        const response = await api.post('/trades/propose/', tradeDetails);
        return response.data;
    } catch (error) {
        console.error('Error proposing trade:', error);
        throw error;
    }
};

// Function to accept a trade
export const acceptTrade = async (tradeId) => {
    try {
        const response = await api.post(`/trades/${tradeId}/accept/`);
        return response.data;
    } catch (error) {
        console.error('Error accepting trade:', error);
        throw error;
    }
};

// Export the configured axios instance for direct use in components
export default api;