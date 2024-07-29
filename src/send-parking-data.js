//send-parking-data.json
const axios = require('axios');

const mockData = [
    {
        "id": "P001",
        "type": "ParkingSpot",
        "availability": true,
        "location": {
            "latitude": 37.7749,
            "longitude": -122.4194
        },
        "timestamp": "2024-05-23T08:00:00Z"
    },
    {
        "id": "P002",
        "type": "ParkingSpot",
        "availability": false,
        "location": {
            "latitude": 37.7751,
            "longitude": -122.4196
        },
        "timestamp": "2024-05-23T08:05:00Z"
    }
];

const sendParkingData = async () => {
    try {
        const response = await axios.post(
            'http://localhost:8668/v2/entities',
            mockData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log('Data sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending data:', error);
    }
};

sendParkingData();
