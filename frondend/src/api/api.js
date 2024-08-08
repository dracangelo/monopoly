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
        const response = await api.get('/api/tiles/');
        const boardData = response.data.map(tile => ({
            ...tile,
            property: {
                price: tile.price, // Ensure the price is correctly mapped
                mortgageValue: tile.mortgage_value, // Ensure the mortgage value is correctly mapped
            }
        }));
        return boardData;
    } catch (error) {
        console.error('Fetch board data error:', error);
        throw error;
    }
};

// Function to fetch players
export const fetchPlayers = async () => {
    try {
        const response = await api.get('/api/players/');
        return response.data;
    } catch (error) {
        console.error('Error fetching players:', error);
        throw error;
    }
};

// Function to fetch the bank balance
export const fetchBank = async () => {
    try {
        const response = await api.get('/api/banks/');
        return response.data;
    } catch (error) {
        console.error('Error fetching bank balance:', error);
        throw error;
    }
};

// Function to fetch stocks
export const fetchStocks = async () => {
    try {
        const response = await api.get('/api/stocks/');
        return response.data;
    } catch (error) {
        console.error('Error fetching stocks:', error);
        throw error;
    }
};

// Function to buy stock
export const buyStock = async (stockId, amount) => {
    try {
        const response = await api.post(`/api/stocks/${stockId}/buy/`, { amount });
        return response.data;
    } catch (error) {
        console.error('Error buying stock:', error);
        throw error;
    }
};

// Function to sell stock
export const sellStock = async (stockId, amount) => {
    try {
        const response = await api.post(`/api/stocks/${stockId}/sell/`, { amount });
        return response.data;
    } catch (error) {
        console.error('Error selling stock:', error);
        throw error;
    }
};

// Function to propose a trade
export const proposeTrade = async (tradeDetails) => {
    try {
        const response = await api.post('/api/trades/propose/', tradeDetails);
        return response.data;
    } catch (error) {
        console.error('Error proposing trade:', error);
        throw error;
    }
};

// Function to accept a trade
export const acceptTrade = async (tradeId) => {
    try {
        const response = await api.post(`/api/trades/${tradeId}/accept/`);
        return response.data;
    } catch (error) {
        console.error('Error accepting trade:', error);
        throw error;
    }
};

// Function to fetch player information
export const getPlayerInfo = async (playerId) => {
    try {
        const response = await api.get(`/players/${playerId}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching player info:', error.response || error);
        throw error;
    }
};

// Export the configured axios instance for direct use in components
export default api;
