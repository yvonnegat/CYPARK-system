// // components/PaymentForm.js
//payform for credit card payment
// import React, { useState } from 'react';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { Button } from '@mui/material';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe('pk_test_51Pfd6ARoAEFEHVnyuzz5ueQdIoNwjz15hufIrjnuZsYoDpRNe5zQ7dZ6PqCEEXFh5YqlbEjQZ3qLIK07pkP9xYNg003svCCtyr'); // Replace with your Stripe publishable key

// const PaymentForm = ({ reservation }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [processing, setProcessing] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     setProcessing(true);
//     const { token, error } = await stripe.createToken(elements.getElement(CardElement));

//     if (error) {
//       setError(error.message);
//       setProcessing(false);
//       return;
//     }

//     try {
//       const response = await fetch('/api/charge', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ token: token.id, reservation }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         alert('Payment successful!');
//       } else {
//         alert('Payment failed: ' + data.error);
//       }
//     } catch (err) {
//       setError('Network error: ' + err.message);
//     }

//     setProcessing(false);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <Button type="submit" variant="contained" color="primary" disabled={processing}>
//         {processing ? 'Processing...' : 'Pay'}
//       </Button>
//       {error && <p>{error}</p>}
//     </form>
//   );
// };

// const PaymentFormWrapper = (props) => (
//   <Elements stripe={stripePromise}>
//     <PaymentForm {...props} />
//   </Elements>
// );

// export default PaymentForm;
