import React, { useState, useEffect } from 'react';
import axios from '../api/api';

const PropertyCard = ({ propertyId }) => {
    const [property, setProperty] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const response = await axios.get(`/properties/${propertyId}/`);
                setProperty(response.data);
            } catch (error) {
                console.error("Error fetching property details:", error);
            }
        };

        fetchPropertyDetails();
    }, [propertyId]);

    const handleBuyHouse = async () => {
        try {
            await axios.post(`/players/${property.owner}/buy_house/`, { property_id: propertyId });
            // Update property details after buying a house
            const response = await axios.get(`/properties/${propertyId}/`);
            setProperty(response.data);
            setError(''); // Clear any previous errors
        } catch (error) {
            console.error("Error buying house:", error);
            setError(error.response.data.error || "Error buying house");
        }
    };

    const handleBuyHotel = async () => {
        try {
            await axios.post(`/players/${property.owner}/buy_hotel/`, { property_id: propertyId });
            // Update property details after buying a hotel
            const response = await axios.get(`/properties/${propertyId}/`);
            setProperty(response.data);
            setError(''); // Clear any previous errors
        } catch (error) {
            console.error("Error buying hotel:", error);
            setError(error.response.data.error || "Error buying hotel");
        }
    };

    return (
        <div>
            {property && (
                <div>
                    <h3>{property.name}</h3>
                    <p>Rent: ${property.rent}</p>
                    <p>Houses: {property.houses}</p>
                    <p>Hotels: {property.hotel ? "1" : "0"}</p>
                    <button onClick={handleBuyHouse} disabled={property.hotel || property.houses >= 4}>Buy House</button>
                    <button onClick={handleBuyHotel} disabled={property.hotel || property.houses < 4}>Buy Hotel</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            )}
        </div>
    );
};

export default PropertyCard;
