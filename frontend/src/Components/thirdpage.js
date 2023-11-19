import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';

function ThirdPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [stratergies, setStratergies] = useState(location.state.stratergies);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location.state.stratergies.length > 1) {
      setStratergies(
        location.state.stratergies[0] + ' & ' + location.state.stratergies[1]
      );
    }
  }, [location.state.stratergies]);

  const getData = async () => {
    setIsLoading(true);
    let postBody = {};
    postBody.Amount = parseInt(location.state.investValue2);
    postBody.Strategies = [];
    if (location.state.stratergies.length === 2) {
      postBody.Strategies = [...location.state.stratergies];
    } else {
      postBody.Strategies = location.state.stratergies;
    }

    let response = await axios.post(`http://127.0.0.1:8000/suggestions`, postBody);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    navigate('/result', {
      state: {
        respData: response.data,
        stratergies: location.state.stratergies,
      },
    });
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection={'column'}
        marginTop="0.5%"
        p={10}
        width="89%"
        marginLeft={'0.1%'}
        height="510px"
      >
        <Box
          display={'flex'}
          flexDirection="column"
          backgroundColor="white"
          p={4}
          borderRadius={4}
        >
          {isLoading ? (
            <Box>
              <Typography>Loading</Typography>
              <BeatLoader color="#00BFFF" />
            </Box>
          ) : (
            <Box>
              <Typography textAlign="left" variant="h5" p={2}>
                Confirmation
              </Typography>
              <Card>
                <CardHeader title="Selected Details" />
                <CardContent>
                  <Divider sx={{ my: 2 }} />
                  <Typography>
                    Investment Amount: {location.state.investValue2} $
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography>Investing Strategies: {stratergies}</Typography>
                </CardContent>
              </Card>

              <Box display="flex" marginTop={'5%'}>
                <Button
                  sx={{ width: '10%' }}
                  variant="outlined"
                  onClick={() =>
                    navigate('/second', {
                      state: {
                        investValue: location.state.investValue2,
                        investing: location.state.stratergies,
                      },
                    })
                  }
                >
                  Back
                </Button>
                <Button
                  variant="outlined"
                  sx={{ width: '10%', marginLeft: '80%' }}
                  onClick={getData}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

export default ThirdPage;
