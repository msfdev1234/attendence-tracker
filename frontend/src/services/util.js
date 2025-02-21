const apiKey = 'AIzaSyDxaUYaUA_toWNIzKjOa_z22u5NaLDO6EY'; // Replace with your actual API key

const getCoordinates = async (address = null) => {
    try {
        let location;
        
        if (!address) {
            console.log("##### Fetching current location...");
            location = await getCurrentLocation();  // Fetch current location if address is not provided
            console.log("##### Current location:", location);

            // Perform reverse geocoding to get an address from coordinates
            const reverseGeocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${apiKey}`;
            const reverseResponse = await fetch(reverseGeocodeUrl);
            const reverseData = await reverseResponse.json();

            if (reverseData.results.length > 0) {
                address = reverseData.results[0].formatted_address;
                console.log("##### Reverse geocoded address:", address);
            } else {
                throw new Error("Reverse geocoding failed: No results found");
            }
        }

        console.log('###### Fetching coordinates for address:', address); // Correct logging
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`);
        
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry.location;
            return { lat, lng }; // Returning the coordinates
        } else {
            throw new Error("No results found for address");
        }
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        throw error;
    }
};


const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log("##### Current position:", position);  // Logs the current position
                    resolve({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error("##### Geolocation error:", error);
                    reject(error);
                }
            );
        } else {
            const error = new Error("Geolocation is not supported by this browser.");
            console.error(error);
            reject(error);
        }
    });
};

// Use named exports
export { getCoordinates, getCurrentLocation };
