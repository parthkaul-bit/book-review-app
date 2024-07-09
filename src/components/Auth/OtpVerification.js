import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { verifyOtp } from '../../api/api';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await verifyOtp(otp);
      // Handle successful OTP verification
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        type="text"
        name="otp"
        label="Enter OTP"
        variant="outlined"
        value={otp}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Verify OTP
      </Button>
      {error && <Typography color="error">{error}</Typography>}
    </form>
  );
};

export default OtpVerification;
