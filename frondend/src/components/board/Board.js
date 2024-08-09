import React, { useState, useEffect } from 'react';
import { fetchBoard, fetchPlayers, fetchBank } from '../../api/api';
import PlayerInfo from '../player/PlayerInfo';
import ActionModal from '../actions/ActionModal';
import StockCard from '../actions/StockCard';
import DiceRoller from '../Dice/DiceRoller';
import Tile from './Tile';
import PlayerIcon from './PlayerIcon';
import './Board.css';

const Board = () => {
    const [boardTiles, setBoardTiles] = useState([]);
    const [players, setPlayers] = useState([]);
    const [bankBalance, setBankBalance] = useState(0);
    const [playerPositions, setPlayerPositions] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [currentTile, setCurrentTile] = useState(null);
    const [showStockCard, setShowStockCard] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getBoardData = async () => {
            try {
                const data = await fetchBoard();
                const filteredTiles = filterTilesById(data);
                const systematicTiles = createSystematicBoard(filteredTiles);
                setBoardTiles(systematicTiles);
            } catch (error) {
                setError('Error fetching board data');
                console.error('Error fetching board data:', error);
            } finally {
                setLoading(false);
            }
        };

        const getPlayersData = async () => {
            try {
                const data = await fetchPlayers();
                setPlayers(data);
                setPlayerPositions(new Array(data.length).fill(0));
            } catch (error) {
                setError('Error fetching players data');
                console.error('Error fetching players data:', error);
            }
        };

        const getBankBalance = async () => {
            try {
                const data = await fetchBank();
                setBankBalance(data.balance);
            } catch (error) {
                setError('Error fetching bank balance');
                console.error('Error fetching bank balance:', error);
            }
        };

        getBoardData();
        getPlayersData();
        getBankBalance();
    }, []);

    const filterTilesById = (tiles) => {
        return tiles.filter(tile => tile.id >= 0 && tile.id <= 39);
    };

    const createSystematicBoard = (tiles) => {
        const cornerTiles = tiles.filter(tile => ['go', 'jail', 'free parking', 'go to jail'].includes(tile.name.toLowerCase()));
        const otherTiles = tiles.filter(tile => !['go', 'jail', 'free parking', 'go to jail'].includes(tile.name.toLowerCase()));
        
        const systematicTiles = [
            cornerTiles.find(tile => tile.name.toLowerCase() === 'go'),
            ...otherTiles.slice(0, 9),
            cornerTiles.find(tile => tile.name.toLowerCase() === 'jail'),
            ...otherTiles.slice(9, 19),
            cornerTiles.find(tile => tile.name.toLowerCase() === 'free parking'),
            ...otherTiles.slice(19, 29),
            cornerTiles.find(tile => tile.name.toLowerCase() === 'go to jail'),
            ...otherTiles.slice(29)
        ];

        return systematicTiles.map((tile, index) => ({
            ...tile,
            position: index
        }));
    };

    const handleRoll = (totalRoll) => {
        const newPositions = [...playerPositions];
        newPositions[currentPlayer] = (newPositions[currentPlayer] + totalRoll) % boardTiles.length;
        setPlayerPositions(newPositions);
        handleTileAction(boardTiles[newPositions[currentPlayer]]);
        setCurrentPlayer((currentPlayer + 1) % players.length);
    };

    const handleTileAction = (tile) => {
        setCurrentTile(tile);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setShowStockCard(false);
    };

    const openStockCard = () => {
        setShowStockCard(true);
    };

    const handleBuyProperty = (tile) => {
        if (!tile.property) {
            console.error('Property data is missing');
            return;
        }

        const updatedPlayers = [...players];
        const player = updatedPlayers[currentPlayer];

        player.properties = player.properties || [];

        if (player.balance >= tile.property.price) {
            player.balance -= tile.property.price;
            player.properties.push(tile.property);
            tile.property.owner = player.name;
            setPlayers(updatedPlayers);
            closeModal();
        } else {
            console.error('Not enough balance to buy the property');
        }
    };

    const handlePayRent = (tile) => {
        const updatedPlayers = [...players];
        const player = updatedPlayers[currentPlayer];

        if (tile.property && tile.property.owner) {
            const rent = tile.property.rent;
            const owner = updatedPlayers.find(p => p.name === tile.property.owner);

            if (player.balance >= rent) {
                player.balance -= rent;
                if (owner) {
                    owner.balance += rent;
                }
            } else {
                console.error('Not enough balance to pay the rent');
            }
        }
        setPlayers(updatedPlayers);
        closeModal();
    };

    const handleMortgageProperty = (tile) => {
        const updatedPlayers = [...players];
        const player = updatedPlayers[currentPlayer];

        if (tile.property && tile.property.owner === player.name && !tile.property.isMortgaged) {
            const mortgageValue = tile.property.mortgageValue;
            player.balance += mortgageValue;
            tile.property.isMortgaged = true;
            setPlayers(updatedPlayers);
            closeModal();
        } else {
            console.error('Cannot mortgage this property');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="game-container">
            <div className="bank-info">
                <h3>Bank Balance: ${bankBalance}</h3>
            </div>
            <div className="players-info">
                {players.map((player, index) => (
                    <PlayerInfo key={player.id} playerId={player.id} />
                ))}
            </div>
            <div className="board">
                {boardTiles.map((tile, index) => (
                    <Tile
                        key={index}
                        {...tile}
                        position={index}
                        onAction={handleTileAction}
                        className={`tile position-${index} ${tile.tile_type}`}
                    />
                ))}
                {players.map((player, index) => (
                    <PlayerIcon 
                        key={player.id} 
                        player={player} 
                        position={playerPositions[index]}
                        playerNumber={index + 1}
                    />
                ))}
            </div>
            <DiceRoller currentPlayer={currentPlayer} setPlayerPositions={setPlayerPositions} onRoll={handleRoll} />
            {showModal && (
                <ActionModal
                    tile={currentTile}
                    player={players[currentPlayer]}
                    onClose={closeModal}
                    onBuyProperty={() => handleBuyProperty(currentTile)}
                    onPayRent={() => handlePayRent(currentTile)}
                    onMortgageProperty={() => handleMortgageProperty(currentTile)}
                    openStockCard={openStockCard}
                />
            )}
            {showStockCard && <StockCard onClose={closeModal} />}
        </div>
    );
};

export default Board;
