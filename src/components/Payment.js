// components/Payment.js

import React from 'react';
import { Grid, Button } from '@mui/material';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const PaymentForm = ({ reservation }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = React.useState(null);
  const [processing, setProcessing] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    const { token, error } = await stripe.createToken(elements.getElement(CardElement));

    if (error) {
      setError(error.message);
      setProcessing(false);
      return;
    }

    try {
      const response = await fetch('/api/charge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token.id, reservation }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Payment successful!');
      } else {
        alert('Payment failed: ' + data.error);
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button type="submit" variant="contained" color="primary" disabled={processing}>
        {processing ? 'Processing...' : 'Pay'}
      </Button>
      {error && <p>{error}</p>}
    </form>
  );
};


const PaymentFormWrapper = (props) => {
  const stripePromise = loadStripe('pk_test_51Pfd6ARoAEFEHVnyuzz5ueQdIoNwjz15hufIrjnuZsYoDpRNe5zQ7dZ6PqCEEXFh5YqlbEjQZ3qLIK07pkP9xYNg003svCCtyr'); // Replace with your Stripe publishable key
  
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm {...props} />
    </Elements>
  );
};


const Payment = ({ reservation }) => {
  if (!reservation || !reservation.paymentMethod) {
    return null; 
  }

  return (
    <Grid container spacing={2}>
      {reservation.paymentMethod === 'creditCard' && (
        <Grid item xs={12}>
          <PaymentFormWrapper reservation={reservation} />
        </Grid>
      )}
    </Grid>
  );
};

export default Payment;
