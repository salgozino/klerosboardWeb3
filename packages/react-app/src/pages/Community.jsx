import { Language, Telegram, Twitter, YouTube } from '@mui/icons-material'
import { Avatar, Card, CardContent, Container, Link, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React from 'react'

export default function Community() {
  return (
    <Container style={{ height: '90%', width: '100%', marginTop: '20px' }}>

      <Typography variant="h4" >Community resources</Typography>

      <List sx={{ display: 'flex', flexDirection: "row" }}>
        <ListItem>
        <Link href='https://twitter.com/kleros' color='inherit'>
          <ListItemAvatar>
            <Avatar><Twitter /></Avatar>
          </ListItemAvatar>
          <ListItemText>Kleros Official Twitter</ListItemText>
          </Link>
        </ListItem>
        <ListItem>
          <Link href='https://kleros.io' color='inherit'>
            <ListItemAvatar>
              <Avatar ><Language /></Avatar>
            </ListItemAvatar>
            <ListItemText>Kleros Official Site</ListItemText>
          </Link>
        </ListItem>
        <ListItem>
        <Link href='https://kleros.io' color='inherit'>
          <ListItemAvatar>
            <Avatar ><Telegram /></Avatar>
          </ListItemAvatar>
          <ListItemText>Kleros  Telegram</ListItemText>
          </Link>
        </ListItem>
        <ListItem>
        <Link href='https://youtube.com/kleros' color='inherit'>
          <ListItemAvatar>
            <Avatar ><YouTube /></Avatar>
          </ListItemAvatar>
          <ListItemText>Youtube</ListItemText>
          </Link>
        </ListItem>
        <ListItem>
        <Link href='https://t.me/proofhumanity' color='inherit'>
          <ListItemAvatar>
            <Avatar ><Telegram /></Avatar>
          </ListItemAvatar>
          <ListItemText>PoH Telegram</ListItemText>
          </Link>
        </ListItem>
      </List>

      <Typography variant='h5'>Community Map</Typography>
      <Card>
        <CardContent>
        If you want to be part of the map, please complete this <Link href="https://forms.gle/dBhbj3Cnx8WtJdfP8" color='inherit'>form</Link> with your name/nickname and city/country information.
        </CardContent>
      </Card>

      <iframe title="Community Map" height="480" src="https://www.google.com/maps/d/embed?mid=177hy7Cx7opzdjeaZXjHMRx1LdJsbKYEH&z=2" width="100%" style={{ border: "0px", marginTop:'20px' }} />

    </Container>
  )
}
