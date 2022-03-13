import { Container } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function NestedLayout() {
  return (
    <Container style={{height:'90%',  width: '100%', marginTop:'20px' }}>
      <Outlet />
    </Container>
  )
}
