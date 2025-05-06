/**
 * Get the current location of the user using the Geolocation API.
 * @returns {Promise<{latitude: number, longitude: number}>} A promise that resolves with the user's latitude and longitude.
 */
export const getCurrentLocation = async () => {
  try {
    if (!navigator.geolocation) {
      throw new Error("Geolocation is not supported by your browser.");
    }

    return await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(new Error(`Error getting location: ${error.message}`));
        }
      );
    });
  } catch (error) {
    console.error("Error in getCurrentLocation:", error);
    throw error;
  }
};

export const calculateDistance = (loc1, loc2) => {
  try {
    const toRadians = (degrees) => (degrees * Math.PI) / 180;

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(loc2.latitude - loc1.latitude);
    const dLon = toRadians(loc2.longitude - loc1.longitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(loc1.latitude)) *
        Math.cos(toRadians(loc2.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000; // Distance in meters
  } catch (error) {
    console.error("Error in calculateDistance:", error);
    return null;
  }
};
