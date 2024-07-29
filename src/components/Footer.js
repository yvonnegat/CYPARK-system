import React from 'react';
import { Container, Typography, Link, Grid } from '@mui/material';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#f0f0f0', padding: '20px 0', marginTop: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              We are dedicated to providing the best parking solutions. Our service ensures you find and reserve a spot quickly and easily.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2">
              Email: <Link href="mailto:info@smartparking.com">info@smartparking.com</Link>
            </Typography>
            <Typography variant="body2">
              Phone: <Link href="tel:+1234567890">+1234567890</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Typography variant="body2">
              <Link href="https://facebook.com" target="_blank" rel="noopener">Facebook</Link>
            </Typography>
            <Typography variant="body2">
              <Link href="https://twitter.com" target="_blank" rel="noopener">Twitter</Link>
            </Typography>
            <Typography variant="body2">
              <Link href="https://instagram.com" target="_blank" rel="noopener">Instagram</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Legal
            </Typography>
            <Typography variant="body2">
              <Link href="/privacy-policy" target="_blank" rel="noopener">Privacy Policy</Link>
            </Typography>
            <Typography variant="body2">
              <Link href="/terms-of-service" target="_blank" rel="noopener">Terms of Service</Link>
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: '20px' }}>
          {'© '} {new Date().getFullYear()} Smart Parking. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
