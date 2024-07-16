import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.css';
import PlayerDashboard from './components/PlayerDashboard';
import PropertyCard from './components/PropertyCard';
import BankDashboard from './components/BankDashboard';
import StockMarket from './components/StockMarket';
import Board from './components/board/Board';
import DiceRoller from './components/Dice/DiceRoller';

function App() {
    const [playerPositions, setPlayerPositions] = useState([0, 0, 0, 0, 0, 0]);

    const movePlayer = (playerIndex, steps) => {
        setPlayerPositions(prevPositions => {
            const newPositions = [...prevPositions];
            newPositions[playerIndex] = (newPositions[playerIndex] + steps) % 40;
            return newPositions;
        });
    };

    return (
        <Router>
            <div className="App">
                <Board playerPositions={playerPositions} />
                <DiceRoller movePlayer={movePlayer} />
                <Routes>
                    <Route path="/players" element={<PlayerDashboard />} />
                    <Route path="/properties" element={<PropertyCard />} />
                    <Route path="/bank" element={<BankDashboard />} />
                    <Route path="/stocks" element={<StockMarket />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
