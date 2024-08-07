// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.css';
import PlayerDashboard from './components/PlayerDashboard';
import PropertyCard from './components/PropertyCard';
import BankDashboard from './components/BankDashboard';
import StockMarket from './components/StockMarket';
import Board from './components/board/Board';
import DiceRoller from './components/Dice/DiceRoller';
import { fetchBoard, fetchPlayers } from './api/api';

function App() {
    const [playerPositions, setPlayerPositions] = useState([0, 0, 0, 0, 0, 0]);
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [boardTiles, setBoardTiles] = useState([]);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const [tilesData, playersData] = await Promise.all([
                    fetchBoard(),
                    fetchPlayers()
                ]);
                setBoardTiles(tilesData);
                setPlayers(playersData);
            } catch (error) {
                console.error('Error loading initial data:', error);
            }
        };

        loadInitialData();
    }, []);

    const movePlayer = (playerIndex, steps) => {
        setPlayerPositions(prevPositions => {
            const newPositions = [...prevPositions];
            newPositions[playerIndex] = (newPositions[playerIndex] + steps) % 40;
            return newPositions;
        });
    };

    const handleRoll = (roll) => {
        movePlayer(currentPlayer, roll);
        setCurrentPlayer((prevPlayer) => (prevPlayer + 1) % players.length);
    };

    return (
        <Router>
            <div className="App">
                <Board playerPositions={playerPositions} boardTiles={boardTiles} />
                <DiceRoller onRoll={handleRoll} currentPlayer={currentPlayer} />
                <Routes>
                    <Route path="/players" element={<PlayerDashboard players={players} />} />
                    <Route path="/properties" element={<PropertyCard />} />
                    <Route path="/bank" element={<BankDashboard />} />
                    <Route path="/stocks" element={<StockMarket />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
