import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from '@mui/material/Container';
import '../App.css';

const BottomTopBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        onSearch(searchQuery);
    };

    return (
        <AppBar className='Appbar' position="static">
            <Toolbar>
                <Container>
                    <Box className='header'
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '20vh',
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{ position: 'center' }}>
                                <TextField
                                    id="search-bar"
                                    label="Search for parking"
                                    variant="outlined"
                                    fullWidth
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    sx={{ marginBottom: 2 }}
                                />
                                <Button variant="contained" color="primary" onClick={handleSearch}>
                                    Find Parking
                                </Button>
                            </div>
                        </div>
                    </Box>
                </Container>
            </Toolbar>
        </AppBar>
    );
}

export default BottomTopBar;
