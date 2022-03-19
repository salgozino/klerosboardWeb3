import { Card, CardContent, CardMedia, CardActions, Container, Grid, Button } from '@mui/material'
import { Link as LinkRouter } from 'react-router-dom';
import React from 'react'

export default function ChainSelector() {
  return (
    <Container>
      <Grid container sx={{ marginTop: '50px' }}>
        <Grid item xs={6} md={6}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              minHeight="140px"
              image="/ethereum_logo.png"
              alt="Gnosis"
            />
            <CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <LinkRouter to="/1"><Button size="medium">Mainnet</Button></LinkRouter>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={6}>
          <Card sx={{ maxWidth: 345}}>
            <CardMedia
              component="img"
              height="345px"
              image="/gnosis_avatar_green_white.png"
              alt="Gnosis"
            />
            <CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <LinkRouter to="/100"><Button size="medium">Gnosis</Button></LinkRouter>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}
