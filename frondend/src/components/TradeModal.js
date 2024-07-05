import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { fetchPlayers, proposeTrade, acceptTrade } from '../api/api';

const TradeModal = ({ isOpen, onRequestClose, currentPlayerId }) => {
    const [players, setPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [offerProperties, setOfferProperties] = useState([]);
    const [requestProperties, setRequestProperties] = useState([]);
    const [offerCash, setOfferCash] = useState(0);
    const [requestCash, setRequestCash] = useState(0);

    useEffect(() => {
        if (isOpen) {
            fetchPlayers().then(data => {
                setPlayers(data);
            });
        }
    }, [isOpen]);

    const handleProposeTrade = () => {
        const tradeDetails = {
            from_player: currentPlayerId,
            to_player: selectedPlayer,
            offer: {
                properties: offerProperties,
                cash: offerCash,
            },
            request: {
                properties: requestProperties,
                cash: requestCash,
            },
        };
        proposeTrade(tradeDetails).then(response => {
            if (response.status === 200) {
                alert('Trade proposed successfully!');
                onRequestClose();
            } else {
                alert('Failed to propose trade');
            }
        });
    };

    const handleAcceptTrade = (tradeId) => {
        acceptTrade(tradeId).then(response => {
            if (response.status === 200) {
                alert('Trade accepted successfully!');
                onRequestClose();
            } else {
                alert('Failed to accept trade');
            }
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Trade Modal"
        >
            <h2>Propose a Trade</h2>
            <div>
                <label>
                    Select Player:
                    <select
                        value={selectedPlayer}
                        onChange={e => setSelectedPlayer(e.target.value)}
                    >
                        <option value="">Select a player</option>
                        {players.filter(player => player.id !== currentPlayerId).map(player => (
                            <option key={player.id} value={player.id}>
                                {player.name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Offer Properties:
                    <input
                        type="text"
                        value={offerProperties}
                        onChange={e => setOfferProperties(e.target.value.split(','))}
                    />
                </label>
            </div>
            <div>
                <label>
                    Request Properties:
                    <input
                        type="text"
                        value={requestProperties}
                        onChange={e => setRequestProperties(e.target.value.split(','))}
                    />
                </label>
            </div>
            <div>
                <label>
                    Offer Cash:
                    <input
                        type="number"
                        value={offerCash}
                        onChange={e => setOfferCash(parseInt(e.target.value, 10))}
                    />
                </label>
            </div>
            <div>
                <label>
                    Request Cash:
                    <input
                        type="number"
                        value={requestCash}
                        onChange={e => setRequestCash(parseInt(e.target.value, 10))}
                    />
                </label>
            </div>
            <button onClick={handleProposeTrade}>Propose Trade</button>
            <button onClick={onRequestClose}>Close</button>
        </Modal>
    );
};

export default TradeModal;
