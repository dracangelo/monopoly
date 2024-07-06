import axios from 'axios';
import config from './config';

// Create an axios instance
const api = axios.create({
    baseURL: config.apiBaseUrl,  // Use the base URL from config
    timeout: 5000,  // Adjust the timeout as necessary
});

// Function to fetch the board
export const fetchBoard = async () => {
    const response = await api.get('/board/');
    return response.data;
};
// Function to fetch players
export const fetchPlayers = async () => {
    const response = await api.get('/players/');
    return response.data;
};

// Function to propose a trade
export const proposeTrade = async (tradeDetails) => {
    const response = await api.post('/trades/propose/', tradeDetails);
    return response.data;
};

// Function to accept a trade
export const acceptTrade = async (tradeId) => {
    const response = await api.post(`/trades/${tradeId}/accept/`);
    return response.data;
};

// Export the configured axios instance for direct use in components
export default api;
