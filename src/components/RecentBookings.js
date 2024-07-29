import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, CircularProgress, Alert, Divider } from '@mui/material';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore'; 
import { useAuth } from '../AuthContext'; 
import { format } from 'date-fns';

const RecentBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchBookings(user.uid);
    }
  }, [user]);

  const fetchBookings = async (userId) => {
    try {
      setLoading(true);
      const bookingsCollection = collection(db, 'users', userId, 'bookings');
      const bookingSnapshot = await getDocs(bookingsCollection);
      const bookingList = bookingSnapshot.docs.map(doc => doc.data());
      setBookings(bookingList);
    } catch (error) {
      setError('Error fetching bookings. Please try again later.');
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ marginBottom: 4, padding: 2, backgroundColor: '#f0f4f8', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Recent Bookings
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : bookings.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          No recent bookings available.
        </Typography>
      ) : (
        <>
          {bookings.map((booking, index) => (
            <Card key={index} sx={{ marginBottom: 2, borderRadius: 2, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                  {booking.name}
                </Typography>
                <Divider sx={{ mb: 1 }} />
                <Typography variant="body2" color="textSecondary">
                  <strong>Start:</strong> {format(booking.startTime.toDate(), 'MMM d, yyyy h:mm a')}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>End:</strong> {format(booking.endTime.toDate(), 'MMM d, yyyy h:mm a')}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Status:</strong> {booking.status}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </Box>
  );
};

export default RecentBookings;
