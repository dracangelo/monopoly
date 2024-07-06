import React, { useEffect, useState } from 'react';
import Tile from './Tile';
import api from '../../api/api';
import './Board.css';

const Board = () => {
    const [tiles, setTiles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTiles = async () => {
            try {
                const response = await api.get('/board/');
                console.log('API response:', response);  // Log response for debugging
                if (response.data && response.data.spaces) {
                    setTiles(response.data.spaces);
                } else {
                    setError('No spaces data found');
                }
            } catch (error) {
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
            {tiles.length > 0 ? (
                tiles.map((tile, index) => (
                    <Tile key={index} {...tile} />
                ))
            ) : (
                <div>No tiles to display</div>
            )}
        </div>
    );
};

export default Board;
