import React, { useState, useEffect } from 'react';
import axios from '../api/api';

const BankDashboard = () => {
    const [bank, setBank] = useState(null);
    const [player, setPlayer] = useState(null);

    const fetchBankDetails = async () => {
        try {
            const response = await axios.get('/bank/');
            setBank(response.data);
        } catch (error) {
            console.error("Error fetching bank details:", error);
        }
    };

    const fetchPlayerDetails = async () => {
        try {
            const response = await axios.get('/players/1/');  // Replace 1 with dynamic player ID
            setPlayer(response.data);
        } catch (error) {
            console.error("Error fetching player details:", error);
        }
    };

    useEffect(() => {
        fetchBankDetails();
        fetchPlayerDetails();
    }, []);

    const handleBorrowFromBank = async (amount) => {
        try {
            await axios.post('/bank/borrow/', { amount });
            // Update bank and player details after borrowing
            fetchBankDetails();
            fetchPlayerDetails();
        } catch (error) {
            console.error("Error borrowing from bank:", error);
        }
    };

    const handlePayMortgage = async (amount) => {
        try {
            await axios.post('/bank/pay_mortgage/', { amount });
            // Update bank and player details after paying mortgage
            fetchBankDetails();
            fetchPlayerDetails();
        } catch (error) {
            console.error("Error paying mortgage:", error);
        }
    };

    return (
        <div>
            {bank && player && (
                <div>
                    <h2>Bank Dashboard</h2>
                    <p>Bank Balance: ${bank.balance}</p>
                    <p>Player Balance: ${player.balance}</p>
                    <button onClick={() => handleBorrowFromBank(1000)}>Borrow $1000</button>
                    <button onClick={() => handlePayMortgage(500)}>Pay $500 Mortgage</button>
                </div>
            )}
        </div>
    );
};

export default BankDashboard;
