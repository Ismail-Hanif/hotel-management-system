import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import StaffNavbar from '../../components/StaffNavbar';

const Analysis = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, 'staffUpdates'));
      const dataArr = querySnapshot.docs.map(doc => doc.data());
      setData(dataArr);
    };

    fetchData();
  }, []);

  return (
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
      <StaffNavbar />
      <Typography variant="h4" sx={{ textAlign: 'center', marginTop: '20px' }}>
        Analysis Data
      </Typography>
      <Grid container spacing={2} sx={{ marginTop: '20px', padding: '20px' }}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">Entry #{index + 1}</Typography>
                <Typography>Rooms Booked: {item.roomsBooked}</Typography>
                <Typography>Services Requested: {item.servicesRequested}</Typography>
                <Typography>Customers Registered: {item.customersRegistered}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Timestamp: {new Date(item.timestamp).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Analysis;
