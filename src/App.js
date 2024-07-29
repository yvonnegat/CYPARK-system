import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LoadingContext } from './components/LoadingContext';
import LoadingAnimation from './components/LoadingAnimation';
import SignInSide from './components/sign-in-side';
import SignUp from './components/signup';
import LandingPage from './components/landingpage';
import Parkingmap from './components/parkingmap';
import UserDashboard from './components/UserDashboard';
import ReservationPage from './components/ReservationPage';
import ParkingSpotDetails from './components/ParkingSpotDetails';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './AuthContext'; 
import Payment from './components/PaymentForm';
import ParkingStatus from './components/ParkingStatus';


const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', 
    },
    secondary: {
      main: '#9c27b0', 
    },
    background: {
      default: '#f5f5f5', 
      paper: '#ffffff', 
    },
    text: {
      primary: '#212121', 
      secondary: 'white', 
    },
  },
  typography: {
    fontFamily: ['"Roboto"', 'Arial', 'sans-serif'].join(','),
    h1: {
      fontFamily: '"Roboto Slab", serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Roboto Slab", serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: '"Roboto Slab", serif',
      fontWeight: 700,
    },
    h4: {
      fontFamily: '"Roboto Slab", serif',
      fontWeight: 700,
    },
    h5: {
      fontFamily: '"Roboto Slab", serif',
      fontWeight: 700,
    },
    h6: {
      fontFamily: '"Roboto Slab", serif',
      fontWeight: 700,
    },
    body1: {
      fontFamily: '"Roboto", sans-serif',
    },
    body2: {
      fontFamily: '"Roboto", sans-serif',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          backgroundColor: '#1976d2', 
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#1565c0', 
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)',
          color: '#ffffff',
          padding: '16px',
          borderRadius: '12px',
          boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1976d2', 
          color: '#ffffff',
        },
      },
    },
  },
});

function App() {
  const { loading, setLoading } = useContext(LoadingContext);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [setLoading]);

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router basename="/cypark-smartparking">
          <Routes>
            <Route path="/signin" element={<SignInSide />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/parkingmap" element={<Parkingmap />} />
            <Route path="/dashboard/*" element={<UserDashboard />} />
            <Route path="/reservation" element={<ReservationPage />} />
            <Route path="/details" element={<ParkingSpotDetails />} />
            <Route path="/admin/*" element={<Dashboard />} />
            <Route path="/parking-spot/:id" element={<ParkingSpotDetails />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/loading" element={<LoadingAnimation />} />
            <Route path ="/status" element ={<ParkingStatus/>} />        
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
