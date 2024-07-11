import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import './Board.css';
import { fetchBoard } from '../../api/api';

const Board = () => {
    const [boardTiles, setBoardTiles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getBoardData = async () => {
            try {
                const data = await fetchBoard();
                console.log('Fetched board data:', data);

                if (data && Array.isArray(data)) {
                    setBoardTiles(data);
                } else {
                    setError('Board data is not in the expected format');
                    console.error('Board data is not an array:', data);
                }
            } catch (error) {
                setError('Error fetching board data');
                console.error('Error fetching board data:', error);
            }
        };

        getBoardData();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="board">
            {boardTiles.length > 0 ? (
                boardTiles.map((tile, index) => (
                    <Tile key={index} {...tile} />
                ))
            ) : (
                <div>No tiles to display</div>
            )}
        </div>
    );
};

export default Board;
