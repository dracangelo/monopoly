import React, { useState, useEffect } from 'react';
import { fetchBoard, fetchPlayers, fetchBank } from '../../api/api';
import PlayerInfo from '../player/PlayerInfo';
import ActionModal from '../actions/ActionModal';
import StockCard from '../actions/StockCard';
import DiceRoller from '../Dice/DiceRoller';
import Tile from './Tile';
import PlayerIcon from './PlayerIcon';
import avatar1 from '../../assets/avatars/avatar1.png';
import avatar2 from '../../assets/avatars/avatar2.png';
import avatar3 from '../../assets/avatars/avatar3.png';
import avatar4 from '../../assets/avatars/avatar4.png';
import avatar5 from '../../assets/avatars/avatar5.png';
import avatar6 from '../../assets/avatars/avatar6.png';
import './Board.css';

const initialPlayers = [
    { id: 1, name: 'Player 1', balance: 7500000, properties: [], hotels: 0, mortgagedProperties: [], avatar: avatar1 },
    { id: 2, name: 'Player 2', balance: 7500000, properties: [], hotels: 0, mortgagedProperties: [], avatar: avatar2 },
    { id: 3, name: 'Player 3', balance: 7500000, properties: [], hotels: 0, mortgagedProperties: [], avatar: avatar3 },
    { id: 4, name: 'Player 4', balance: 7500000, properties: [], hotels: 0, mortgagedProperties: [], avatar: avatar4 },
    { id: 5, name: 'Player 5', balance: 7500000, properties: [], hotels: 0, mortgagedProperties: [], avatar: avatar5 },
    { id: 6, name: 'Player 6', balance: 7500000, properties: [], hotels: 0, mortgagedProperties: [], avatar: avatar6 },
];

const Board = () => {
    const [boardTiles, setBoardTiles] = useState([]);
    const [players, setPlayers] = useState(initialPlayers);
    const [bankBalance, setBankBalance] = useState(0);
    const [playerPositions, setPlayerPositions] = useState([0, 0, 0, 0, 0, 0]);
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

                // Ensure all property tiles have a property object with default values
                const updatedTiles = data.map(tile => {
                    if (tile.tile_type === 'property' && !tile.property) {
                        tile.property = {
                            owner: null,
                            price: 0,
                            rent: 0,
                            houses: 0,
                            hotel: false,
                            color_group: '',
                            mortgageValue: 0,
                            isMortgaged: false
                        };
                    }
                    return tile;
                });

                setBoardTiles(updatedTiles.filter(tile => tile.id >= 0 && tile.id < 40));
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
            player.balance += tile.property.mortgageValue;
            tile.property.isMortgaged = true;
            setPlayers(updatedPlayers);
        } else {
            console.error('Cannot mortgage property');
        }
        closeModal();
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
                        className={`tile position-${index}`}
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
