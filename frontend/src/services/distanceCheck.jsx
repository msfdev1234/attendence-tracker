import React, { useState } from 'react';

const DistanceCheck = ({ originLat, originLong }) => {
    const [userLat, setUserLat] = useState(null);
    const [userLong, setUserLong] = useState(null);

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    setUserLat(latitude);
                    setUserLong(longitude);
                    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                },
                error => {
                    alert('Error getting location: ' + error.message);
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the Earth in km
        const dLat = (lat2 - lat1) * (Math.PI / 180); // Convert to radians
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in km
        return distance * 3280.84; // Convert to feet
    };

    const checkDistance = () => {
        if (userLat !== null && userLong !== null) {
            const distance = calculateDistance(originLat, originLong, userLat, userLong);
            if (distance <= 50) {
                alert('Success: You are within 50 feet of the origin.');
            } else {
                alert('Fail: You are more than 50 feet away from the origin.');
            }
        } else {
            alert('Please get your current location first.');
        }
    };

    return (
        <div>
            <button onClick={getCurrentLocation}>Get Current Location</button>
            <button onClick={checkDistance}>Check Distance</button>
        </div>
    );
};

export default DistanceCheck;
