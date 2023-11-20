import {
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  InputLabel,
  FormControl,
  Button,
  Box,
  Typography,
  FormHelperText,
} from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function StrategiesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };
  const names = [
    'Ethical Investing',
    'Growth Investing',
    'Index Investing',
    'Quality Investing',
    'Value Investing',
  ];

  const [investing, setInvesting] = useState([]);
  const [fieldError, setFieldError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setInvesting(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const sendValue = () => {
    if (investing.length === 0) {
      setFieldError(true);
      setHelperText('please select the strategies');
    } else if (investing.length > 2) {
      setFieldError(true);
      setHelperText('maximum of 2 Investment strategies can be selected');
    } else {
      navigate('/confirm', {
        state: {
          investValue2: location.state.investValue,
          strategies: investing,
        },
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection={'column'}
        marginTop="0.5%"
        p={10}
        height="510px"
        width="89%"
        marginLeft={'0.1%'}
      >
        <Box backgroundColor="white" p={4} borderRadius={4}>
          <Typography sx={{ textAlign: 'left', marginBottom: '3%' }}>
            Step 2: Select Strategies
          </Typography>
          <FormControl sx={{ width: 500, marginRight: '85%' }}>
            <InputLabel id="demo-multiple-checkbox-label">
              Investing Strategies
            </InputLabel>
            <Select
              multiple
              value={investing}
              onChange={handleChange}
              input={<OutlinedInput label="Investing Strategies" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
              error={fieldError}
              helpertext={helperText}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={investing.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
            {fieldError ? (
              <FormHelperText error>{helperText}</FormHelperText>
            ) : null}
          </FormControl>
          <Typography sx={{ textAlign: 'left' }}>
            Pick one or two Investment strategies
          </Typography>
          <Box display="flex" marginTop={'5%'}>
            <Button
              sx={{ width: '10%' }}
              variant="outlined"
              onClick={() => {
                navigate('/');
              }}
            >
              Back
            </Button>
            <Button
              sx={{ width: '10%', marginLeft: '80%' }}
              variant="outlined"
              onClick={() => sendValue()}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default StrategiesPage;
