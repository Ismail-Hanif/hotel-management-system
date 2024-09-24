import React from 'react'
import StaffNavbar from '../../components/StaffNavbar'
import { Box } from '@mui/material';

const Manager = () => {
  return (
    <div>
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
<StaffNavbar/>
<h1>Management System</h1>
  </Box>
      </div>
  )
}

export default Manager;