import axios from 'axios';

const GEOCODING_API_KEY = 'deffb11ef057466ca20e3a5b9ca62e71';

export const geocodeLocation = async (location) => {
    try {
        const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
            params: {
                q: location,
                key: GEOCODING_API_KEY,
            },
        });
        if (response.data.results.length > 0) {
            const { lat, lng } = response.data.results[0].geometry;
            return { latitude: lat, longitude: lng };
        }
    } catch (error) {
        console.error('Error geocoding location:', error);
    }
    return null;
};
