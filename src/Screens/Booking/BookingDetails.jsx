import React, { useEffect, useState } from 'react';
import { db } from '../../Config/Firebase';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import StaffNavbar from '../../components/StaffNavbar';
import { Box, Card, CardContent, Typography, Button, Select, MenuItem, FormControl } from '@mui/material';

const BookingDetails = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const bookingCollection = collection(db, 'bookings');
      const bookingSnapshot = await getDocs(bookingCollection);
      const bookingList = bookingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(bookingList);
    };
    
    fetchBookings();
  }, []);

  const handleStatusChange = async (bookingId, newStatus) => {
    const bookingRef = doc(db, 'bookings', bookingId);
    
    if (newStatus === 'Available') {
      await deleteDoc(bookingRef);
      setBookings(prev => prev.filter(booking => booking.id !== bookingId));
    } else {
      await updateDoc(bookingRef, { status: newStatus });
      setBookings(prev => prev.map(booking => (booking.id === bookingId ? { ...booking, status: newStatus } : booking)));
    }
  };

  return (
    <div>
      <StaffNavbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: '240px', 
          padding: 2,
          width: 'calc(100% - 240px)',
          overflowX: 'hidden', 
          '@media (max-width: 600px)': {
            marginLeft: 0,
            width: '100%',
          },
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Booking Details
        </Typography>
        {bookings.map(booking => (
          <Card key={booking.id} sx={{ marginBottom: '20px', padding: '20px' }}>
            <CardContent>
              <Typography variant="h5">{booking.title}</Typography>
              <Typography variant="body1">Nights: {booking.nights}</Typography>
              <Typography variant="body1">Total Price: ${booking.totalPrice}</Typography>
              <FormControl sx={{ marginTop: '10px' }}>
                <Select
                  value={booking.status || 'Occupied'}
                  onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                >
                  <MenuItem value="Occupied">Occupied</MenuItem>
                  <MenuItem value="Available">Available</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default BookingDetails;
