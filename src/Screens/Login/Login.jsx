import React, { useState } from 'react';
import { TextField, Button, IconButton, InputAdornment, Link, Box, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../Config/Firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      localStorage.setItem('userId', user.uid);

      if (formData.email === 'manager@gmail.com' && formData.password === 'manager') {
        navigate('/manager');
      } else if (formData.email === 'admin@gmail.com' && formData.password === 'admin1') {
        navigate('/admin');
      } else if (formData.email.includes('staff') && formData.password === 'staff1') {
        navigate('/staff');
      } else {
        await addDoc(collection(db, 'CustomerDetails'), {
          UID: user.uid,
          email: formData.email,
        });

        navigate('/home');
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  return (
    <Box
      sx={{
        width: { xs: '90%', sm: '400px' },
        margin: 'auto',
        marginTop: '10vh',
        padding: '2rem',
        boxShadow: 3,
        borderRadius: 2,
        textAlign: 'center',
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          type="email"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>
          Login
        </Button>
        <Link href="/signup" underline="hover" style={{ display: 'block', marginTop: '10px' }}>
          Don't have an account? Signup
        </Link>
      </form>
    </Box>
  );
};

export default Login;
