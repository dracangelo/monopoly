import React, { useState, useEffect } from 'react';
import axios from '../api/api';

const StockMarket = ({ playerId }) => {
    const [stocks, setStocks] = useState([]);

    const fetchStockPrices = async () => {
        try {
            const response = await axios.get('/stocks/');
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
            await axios.post(`/stocks/${stockId}/buy/`, { playerId, amount });
            // Update stock prices after buying
            fetchStockPrices();
        } catch (error) {
            console.error("Error buying stock:", error);
        }
    };

    const handleSellStock = async (stockId, amount) => {
        try {
            await axios.post(`/stocks/${stockId}/sell/`, { playerId, amount });
            // Update stock prices after selling
            fetchStockPrices();
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
