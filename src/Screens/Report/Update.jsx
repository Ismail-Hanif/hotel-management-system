import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import StaffNavbar from '../../components/StaffNavbar';

const Update = () => {
  const [roomsBooked, setRoomsBooked] = useState('');
  const [servicesRequested, setServicesRequested] = useState('');
  const [customersRegistered, setCustomersRegistered] = useState('');
  
  const db = getFirestore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'staffUpdates'), {
        roomsBooked: parseInt(roomsBooked),
        servicesRequested: parseInt(servicesRequested),
        customersRegistered: parseInt(customersRegistered),
        timestamp: new Date().toISOString(),
      });

    
      setRoomsBooked('');
      setServicesRequested('');
      setCustomersRegistered('');
      alert('Data updated successfully!');
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <StaffNavbar />
      <Typography variant="h4" gutterBottom>Update Data</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Rooms Booked"
          type="number"
          fullWidth
          margin="normal"
          value={roomsBooked}
          onChange={(e) => setRoomsBooked(e.target.value)}
          required
        />
        <TextField
          label="Services Requested"
          type="number"
          fullWidth
          margin="normal"
          value={servicesRequested}
          onChange={(e) => setServicesRequested(e.target.value)}
          required
        />
        <TextField
          label="Customers Registered"
          type="number"
          fullWidth
          margin="normal"
          value={customersRegistered}
          onChange={(e) => setCustomersRegistered(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Update;
