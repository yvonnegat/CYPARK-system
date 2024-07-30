const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT;

const getAccessToken = async () => {
    const { CONSUMER_KEY, CONSUMER_SECRET } = process.env;
    const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
    const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
        headers: { 'Authorization': `Basic ${auth}` }
    });
    return response.data.access_token;  
};

const lipaNaMpesaOnline = async (phoneNumber, amount) => {
    const accessToken = await getAccessToken();
    const { SHORTCODE, PASSKEY, CALLBACK_URL } = process.env;
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = Buffer.from(`${SHORTCODE}${PASSKEY}${timestamp}`).toString('base64');
    
    try {
        const response = await axios.post(
            'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
            {
                BusinessShortCode: SHORTCODE,
                Password: password,
                Timestamp: timestamp,
                TransactionType: 'CustomerPayBillOnline',
                Amount: amount,
                PartyA: phoneNumber,
                PartyB: SHORTCODE,
                PhoneNumber: phoneNumber,
                CallBackURL: CALLBACK_URL,
                AccountReference: 'Reference',
                TransactionDesc: 'Payment Description',
            },
            {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error making M-Pesa request:', error.response ? error.response.data : error.message);
        throw error;
    }
};

app.post('/api/pay', async (req, res) => {
    const { phoneNumber, amount } = req.body;
    try {
        const result = await lipaNaMpesaOnline(phoneNumber, amount);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
