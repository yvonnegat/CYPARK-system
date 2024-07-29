//components/Reservation.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import Payment from './Payment';
import Summary from './summary';
import TopBar from './TopBar';
import Footer from './Footer';
import { useAuth } from '../AuthContext';
import { doc, getDoc, collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

// import creditCardLogo from '../images/credit.png';
// import paypalLogo from '../images/paypal.png';
// import mpesaLogo from '../images/mpesa.png';

const ReservationPage = () => {
  const { user } = useAuth();
  const location = useLocation();
  const { spot } = location.state || {};

  const [reservation, setReservation] = useState({
    startTime: '',
    endTime: '',
    paymentMethod: '',
    amount: 0,
    name: '',
    email: '',
    phone: '',
    licenseId: '',
  });
  const [receipt, setReceipt] = useState('');

  useEffect(() => {
    if (user) {
      setReservation((prev) => ({
        ...prev,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phone,
        licenseId: user.licenseId || '',
      }));
    }
  }, [user]);

  const calculateAmount = (startTime, endTime, pricePerHour) => {
    if (!startTime || !endTime || !pricePerHour) return 0;
    const start = new Date(startTime);
    const end = new Date(endTime);
    const hours = Math.abs(end - start) / 36e5;
    return Math.round(hours * pricePerHour);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'endTime' && reservation.startTime && spot && {
        amount: calculateAmount(reservation.startTime, value, spot.price),
      }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!spot || !spot.name) {
      alert('Invalid parking spot data. Please try again.');
      return;
    }

    try {
      const bookingData = {
        name: spot.name,
        bookingId: 'tgdi2581bsi',
        createdAt: Timestamp.now(),
        endTime: Timestamp.fromDate(new Date(reservation.endTime)),
        startTime: Timestamp.fromDate(new Date(reservation.startTime)),
        status: 'confirmed',
        amount: reservation.amount,
        licenseId: reservation.licenseId,
      };

      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const docRef = await addDoc(collection(db, 'users', user.uid, 'bookings'), bookingData);
          console.log('Document written with ID: ', docRef.id);
          setReceipt(generateReceipt(bookingData));
          alert('Reservation confirmed!');
        } else {
          alert('User document does not exist.');
        }
      }
    } catch (error) {
      console.error('Error adding booking: ', error);
      alert('Error confirming reservation. Please try again.');
    }
  };

  const generateReceipt = (bookingData) => {
    return `
      <html>
        <head>
          <title>Reservation Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .container { max-width: 600px; margin: auto; }
            h1 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            table, th, td { border: 1px solid #ddd; }
            th, td { padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Reservation Receipt</h1>
            <table>]413
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
              <tr>
                <td>Booking ID</td>
                <td>${bookingData.bookingId}</td>
              </tr>
              <tr>
                <td>Parking Spot</td>
                <td>${bookingData.name}</td>
              </tr>
              <tr>
                <td>Start Time</td>
                <td>${bookingData.startTime.toDate().toLocaleString()}</td>
              </tr>
              <tr>
                <td>End Time</td>
                <td>${bookingData.endTime.toDate().toLocaleString()}</td>
              </tr>
              <tr>
                <td>Amount</td>
                <td>$${bookingData.amount}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>${bookingData.status}</td>
              </tr>
              <tr>
                <td>Created At</td>
                <td>${bookingData.createdAt.toDate().toLocaleString()}</td>
              </tr>
              <tr>
                <td>License ID</td>
                <td>${bookingData.licenseId}</td>
              </tr>
            </table>
          </div>
        </body>
      </html>
    `;
  };

  const printReceipt = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.open();
    printWindow.document.write(receipt);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div>
      <TopBar />
      <Container>
        <Box sx={{ marginTop: 4, marginBottom: 4 }}>
          <Typography variant="h4" gutterBottom>
            Booking
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Reservation Details
                  </Typography>
                  <Divider sx={{ marginBottom: 2 }} />
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Start Time"
                          name="startTime"
                          type="datetime-local"
                          fullWidth
                          value={reservation.startTime}
                          onChange={handleChange}
                          required
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="End Time"
                          name="endTime"
                          type="datetime-local"
                          fullWidth
                          value={reservation.endTime}
                          onChange={handleChange}
                          required
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                          Payment Method
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={4}>
                            <Button
                              fullWidth
                              variant="contained"
                              style={{ backgroundColor: '#0070BA', color: '#fff' }}
                              onClick={() => setReservation((prev) => ({ ...prev, paymentMethod: 'paypal' }))}
                            >
                              {/* <img src={paypalLogo} alt="PayPal" style={{ height: 24, marginRight: 8 }} /> */}
                              PayPal
                            </Button>
                          </Grid>
                          <Grid item xs={4}>
                            <Button
                              fullWidth
                              variant="contained"
                              style={{ backgroundColor: '#4A90E2', color: '#fff' }}
                              onClick={() => setReservation((prev) => ({ ...prev, paymentMethod: 'creditCard' }))}
                            >
                              {/* <img src={creditCardLogo} alt="Credit Card" style={{ height: 24, marginRight: 8 }} /> */}
                              Credit Card
                            </Button>
                          </Grid>
                          <Grid item xs={4}>
                            <Button
                              fullWidth
                              variant="contained"
                              style={{ backgroundColor: '#00C853', color: '#fff' }}
                              onClick={() => setReservation((prev) => ({ ...prev, paymentMethod: 'mpesa' }))}
                            >
                              {/* <img src={mpesaLogo} alt="M-Pesa" style={{ height: 24, marginRight: 8 }} /> */}
                              M-Pesa
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        {reservation.paymentMethod && (
                          <Payment reservation={reservation} handleChange={handleChange} />
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                          Confirm Reservation
                        </Button>
                        {receipt && (
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={printReceipt}
                            sx={{ marginLeft: 2 }}
                          >
                            Print Receipt
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Summary
                  </Typography>
                  <Divider sx={{ marginBottom: 2 }} />
                  <Summary reservation={reservation} />
                  <Typography variant="h6" sx={{ marginTop: 2 }}>
                    Total Amount: ${reservation.amount}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </div>
  );
};

export default ReservationPage;
