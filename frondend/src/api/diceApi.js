export const rollDice = () => {
    return new Promise((resolve) => {
        const diceRoll1 = Math.floor(Math.random() * 6) + 1;
        const diceRoll2 = Math.floor(Math.random() * 6) + 1;
        setTimeout(() => resolve([diceRoll1, diceRoll2]), 500);
    });
};