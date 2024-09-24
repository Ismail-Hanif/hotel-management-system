import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import { db } from '../../Config/Firebase';
import { collection, getDocs } from 'firebase/firestore';
import StaffNavbar from '../../components/StaffNavbar';

const ServicesDetails = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const requestsCollection = await getDocs(collection(db, 'ServiceRequests'));
        const requestsData = requestsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRequests(requestsData);
      } catch (error) {
        console.error('Error fetching service requests:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
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
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Service Requests
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <Box>
            {requests.length === 0 ? (
              <Typography>No service requests found.</Typography>
            ) : (
              requests.map((request) => (
                <Card key={request.id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6">{request.service}</Typography>
                    <Typography>Name: {request.name}</Typography>
                    <Typography>Room: {request.room}</Typography>
                    <Typography>Details: {request.request}</Typography>
                  </CardContent>
                </Card>
              ))
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ServicesDetails;
