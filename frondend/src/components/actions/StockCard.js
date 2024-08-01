import React, { useState, useEffect } from 'react';
import { fetchStocks, buyStock, sellStock } from '../../api/api';
import './StockCard.css';

const StockCard = ({ onClose }) => {
    const [stocks, setStocks] = useState([]);
    const [selectedStock, setSelectedStock] = useState(null);
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        const getStocks = async () => {
            try {
                const data = await fetchStocks();
                setStocks(data);
            } catch (error) {
                console.error('Error fetching stocks:', error);
            }
        };

        getStocks();
    }, []);

    const handleBuyStock = async () => {
        if (selectedStock && amount > 0) {
            await buyStock(selectedStock.id, amount);
            onClose();
        }
    };

    const handleSellStock = async () => {
        if (selectedStock && amount > 0) {
            await sellStock(selectedStock.id, amount);
            onClose();
        }
    };

    return (
        <div className="stock-card">
            <h2>Stocks</h2>
            <div className="stock-list">
                {stocks.map(stock => (
                    <div
                        key={stock.id}
                        className={`stock-item ${selectedStock && selectedStock.id === stock.id ? 'selected' : ''}`}
                        onClick={() => setSelectedStock(stock)}
                    >
                        <p>{stock.name}</p>
                        <p>Price: ${stock.price.toFixed(2)}</p>
                    </div>
                ))}
            </div>
            <div className="stock-actions">
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="Amount"
                />
                <button onClick={handleBuyStock}>Buy</button>
                <button onClick={handleSellStock}>Sell</button>
            </div>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default StockCard;
