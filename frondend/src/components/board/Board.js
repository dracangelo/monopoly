import React, { useEffect, useState } from 'react';
import Tile from './Tile';
import api from '../../api/api'; // Make sure this path is correct for your file structure
import './Board.css';

const Board = () => {
    const [tiles, setTiles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTiles = async () => {
            try {
                const response = await api.get('/board/');
                if (response.status !== 200) {
                    throw new Error(`Error: ${response.status}`);
                }
                setTiles(response.data[0].spaces); // Access the first board's spaces
            } catch (error) {
                console.error('Fetch error:', error); // Debugging log
                setError(error.message);
            }
        };

        fetchTiles();
    }, []);

    if (error) {
        return <div>Error fetching tiles: {error}</div>;
    }

    return (
        <div className="board">
            {tiles.map((tile, index) => (
                <Tile key={index} {...tile} />
            ))}
        </div>
    );
};

export default Board;
