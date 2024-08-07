import React, { useState, useEffect } from 'react';
import axios from '../api/api';

const StockMarket = ({ playerId }) => {
    const [stocks, setStocks] = useState([]);

    const fetchStockPrices = async () => {
        try {
            const response = await axios.get('/api/stocks/'); // Corrected endpoint
            setStocks(response.data);
        } catch (error) {
            console.error("Error fetching stock prices:", error);
        }
    };

    useEffect(() => {
        fetchStockPrices();
    }, []);

    const handleBuyStock = async (stockId, amount) => {
        try {
            await axios.post(`/api/stocks/${stockId}/buy/`, { playerId, amount }); // Corrected endpoint
            fetchStockPrices(); // Update stock prices after buying
        } catch (error) {
            console.error("Error buying stock:", error);
        }
    };

    const handleSellStock = async (stockId, amount) => {
        try {
            await axios.post(`/api/stocks/${stockId}/sell/`, { playerId, amount }); // Corrected endpoint
            fetchStockPrices(); // Update stock prices after selling
        } catch (error) {
            console.error("Error selling stock:", error);
        }
    };

    return (
        <div>
            <h2>Stock Market</h2>
            {stocks.map(stock => (
                <div key={stock.id}>
                    <p>{stock.name}: ${stock.price}</p>
                    <button onClick={() => handleBuyStock(stock.id, 10)}>Buy 10</button>
                    <button onClick={() => handleSellStock(stock.id, 10)}>Sell 10</button>
                </div>
            ))}
        </div>
    );
};

export default StockMarket;
