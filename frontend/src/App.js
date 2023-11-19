import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './assets/home.png';
import Firstpage from './Components/firstpage';
import SecondPage from './Components/secondpage';
import Button from '@mui/material/Button';
import ThirdPage from './Components/thirdpage';
import Result from './Components/result';
import { Box, Typography, Modal } from '@mui/material';
import { useState } from 'react';
import ShowTrends from './Components/Trends';

function App() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
      <div className="App container-fluid">
        <Box
            display="flex"
            flexDirection="row"
            sx={{
              background: 'linear-gradient(to bottom, #5D82A2, #8EA6BD, #B6D9E6)',
            }}
            p={3}
        >
          <Modal open={open} onClose={handleClose}>
            <Box
                border={1}
                padding={4}
                width="90%"
                height={600}
                borderRadius={4}
                sx={{
                  backgroundColor: 'white',
                  marginTop: '5%',
                  marginLeft: '3%',
                }}
            >
              <Typography variant="h5" marginLeft="44%" height="10%" width="40%">
                Market Trend
              </Typography>

              <ShowTrends />
              <Button
                  sx={{ marginLeft: '94.5%', marginTop: '1%' }}
                  variant="outlined"
                  onClick={handleClose}
              >
                Ok
              </Button>
            </Box>
          </Modal>
          <img
              src={Home}
              width="45"
              height="45"
              onClick={() => navigate('/')}
              style={{ cursor: 'pointer' }}
              alt={'Home'}
          />
          <Typography variant="h4" sx={{ margin: 'auto' }}>
            Stock Recommendation Engine
          </Typography>
          <Button onClick={handleOpen} style={{ color: 'black' }}>
            Show Trends
          </Button>
        </Box>

        <Routes>
          <Route path="/" element={<Firstpage />} />
          <Route path="/second" element={<SecondPage />} />
          <Route path="/third" element={<ThirdPage />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
  );
}

export default App;
