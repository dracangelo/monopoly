import React, { useState } from 'react';
import './DiceRoller.css';

const DiceRoller = ({ onRoll, currentPlayer }) => {
    const [roll, setRoll] = useState(null);

    const rollDice = () => {
        const result = Math.floor(Math.random() * 6) + 1;
        setRoll(result);
        onRoll(result);
    };

    return (
        <div className="dice-roller">
            <button onClick={rollDice}>Roll Dice</button>
            <p>Current Player: {currentPlayer ? currentPlayer.name : 'N/A'}</p>
            <p>Total Roll: {roll}</p>
        </div>
    );
};

export default DiceRoller;
