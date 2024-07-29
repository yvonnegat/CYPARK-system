import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid, Container, Divider } from '@mui/material';
import { useAuth } from '../AuthContext';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AccountDetails = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    licenseId: ''  
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        password: '',
        licenseId: user.licenseId || '' 
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          await setDoc(userDocRef, {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            licenseId: formData.licenseId, 
            
          }, { merge: true });

          setUser({
            ...user,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            licenseId: formData.licenseId,
          });

          setMessage('Account updated successfully');
        } else {
          setMessage('User document does not exist');
        }
      }
    } catch (error) {
      setMessage('Error updating account');
      console.error('Error updating account:', error);
    }
  };

  if (!user) {
    return <Typography>Loading user data...</Typography>;
  }

  return (
    <Container>
      <Box
        sx={{
          padding: 4,
          background: 'linear-gradient(135deg, #9c27b0, #3f51b5)',
          borderRadius: 2,
          boxShadow: 3,
          minHeight: '100vh'
        }}
      >
        <Typography variant="h4" gutterBottom>
          Update Account Details
        </Typography>
        <Divider sx={{ marginBottom: 3 }} />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
                type="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
                type="tel"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="License ID"
                name="licenseId"
                value={formData.licenseId}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="New Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
        {message && <Typography variant="body1" sx={{ marginTop: 2 }}>{message}</Typography>}
      </Box>
    </Container>
  );
};

export default AccountDetails;
