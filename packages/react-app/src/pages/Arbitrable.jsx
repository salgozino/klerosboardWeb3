import { Typography } from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom';

export default function Arbitrable() {
  const { id } = useParams();

  return (
    <Typography variant='h4'>Arbitrable: {id}</Typography>
  )
}
