import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.css';  // Ensure this file exists
import PlayerDashboard from './components/PlayerDashboard';
import PropertyCard from './components/PropertyCard';
import BankDashboard from './components/BankDashboard';
import StockMarket from './components/StockMarket';
import Board from './components/board/Board';
import DiceRoller from './components/Dice/DiceRoller';

function App() {
    return (
        <Router>
            <div className="App">
                <Board />
                <DiceRoller />
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
