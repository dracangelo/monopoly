import axios from 'axios';

// Create an axios instance
const api = axios.create({
    baseURL: 'http://localhost:8000/api',  // Adjust the base URL as needed
    timeout: 5000,  // You can adjust the timeout as necessary
});

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
