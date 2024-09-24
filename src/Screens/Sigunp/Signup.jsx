import React, { useState } from 'react';
import { TextField, Button, IconButton, InputAdornment, Link, Box, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../Config/Firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contactInfo: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

    
      await addDoc(collection(db, 'userhms'), {
        UID: user.uid,
        Name: formData.name,
        email: formData.email,
        contactInfo: formData.contactInfo,
      });

      
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error.message);
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
        Signup
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
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
        <IconButton
          onClick={() => setShowPassword(!showPassword)}
          edge="end"
        >
          {showPassword ? <Visibility /> : <VisibilityOff />} 
        </IconButton>
      </InputAdornment>
    ),
  }}
/>

        <TextField
          label="Contact Info"
          name="contactInfo"
          value={formData.contactInfo}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>
          Signup
        </Button>
      </form>
    
      <Typography sx={{ marginTop: 2 }}>
        Already have an account?{' '}
        <Link href="/login" underline="hover">
          Login here
        </Link>
      </Typography>
    </Box>
  );
};

export default Signup;
