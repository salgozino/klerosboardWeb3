import { Typography } from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom';

export default function Profile() {
    const { id } = useParams();

  return (
    <Typography variant='h4'>Profile: {id}</Typography>
  )
}
