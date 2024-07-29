const express = require('express');
const cors = require('cors'); 
const stripe = require('stripe')('sk_test_51Pfd6ARoAEFEHVny12f5wMetm0ZSdX5sJkWhjaFW0dr9r8LfbShhQnfMWKWQJjgJWnwYjE2xkJRqxIkxim7Wd4JT00GFoTSXDD'); // Replace with your Stripe secret key
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/charge', async (req, res) => {
  const { token, reservation } = req.body;

  try {
    const charge = await stripe.charges.create({
      amount: reservation.amount * 100, 
      currency: 'usd',
      description: `Booking for ${reservation.name}`,
      source: token,
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Charge error:', error);
    res.json({ success: false, error: error.message });
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));
