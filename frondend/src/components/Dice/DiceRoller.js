import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './DiceRoller.css';

const DiceRoller = ({ onRoll, currentPlayer }) => {
    const [total, setTotal] = useState(null);

    const rollDice = () => {
        const roll1 = Math.floor(Math.random() * 6) + 1;
        const roll2 = Math.floor(Math.random() * 6) + 1;
        const totalRoll = roll1 + roll2;
        setTotal(totalRoll);
        onRoll(totalRoll);
    };

    return (
        <div className="dice-roller">
            <button onClick={rollDice}>Roll Dice</button>
            <p>Current Player: {currentPlayer + 1}</p>
            {total !== null && <p>Total Roll: {total}</p>}
        </div>
    );
};

DiceRoller.propTypes = {
    onRoll: PropTypes.func.isRequired,
    currentPlayer: PropTypes.number.isRequired,
};

export default DiceRoller;
