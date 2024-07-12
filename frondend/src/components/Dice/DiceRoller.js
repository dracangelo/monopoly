import React, { useState } from 'react';
import './DiceRoller.css'; // Make sure to create a CSS file for styling

const DiceRoller = () => {
    const [dice1, setDice1] = useState(1);
    const [dice2, setDice2] = useState(1);
    const [total, setTotal] = useState(2);

    const rollDice = () => {
        const newDice1 = Math.floor(Math.random() * 6) + 1;
        const newDice2 = Math.floor(Math.random() * 6) + 1;
        setDice1(newDice1);
        setDice2(newDice2);
        setTotal(newDice1 + newDice2);
    };

    return (
        <div className="dice-roller">
            <div className="dice">
                <div className={`dice-face dice-face-${dice1}`}>{dice1}</div>
                <div className={`dice-face dice-face-${dice2}`}>{dice2}</div>
            </div>
            <button onClick={rollDice}>Roll Dice</button>
            <div className="total">Total: {total}</div>
        </div>
    );
};

export default DiceRoller;
