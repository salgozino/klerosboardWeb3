import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import athenea from '../images/athenea.jpg';

export default function NotFound() {
  return (
    <Container style={{height:'90%',  width: '100%', marginTop:'20px' }}>
      <Typography>Upps, something it's wrong in Athena</Typography>
      <Box
        component="img"
        alt="404 error. Athenea image"
        src={athenea}
      />

    </Container>
  )
}
