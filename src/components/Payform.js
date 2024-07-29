// components/Payform.js
//payform for mpesa integration
import React, { useState } from 'react';
import axios from 'axios';
import '../PaymentForm.css';
import '../App.css';

const Payform = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [message, setMessage] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/stk', {
        phone: phoneNumber,
        amount: paymentAmount,
      });
      setMessage(`Payment request sent successfully: ${response.data.CheckoutRequestID}`);
    } catch (error) {
      setMessage(`Error: ${error.response ? error.response.data.error : error.message}`);
    }
  };

  return (
    <div className="payment-form-container">
      <form onSubmit={handlePayment} className="payment-form">
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Pay</button>
      </form>
      {message && <p className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</p>}
    </div>
  );
};

export default Payform;
