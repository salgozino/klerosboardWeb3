import LatestStakes from "../components/LatestStakes";
import LatestDisputes from "../components/latestDisputes";
import { Container, Grid } from "@mui/material";



export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={2}>
          <LatestStakes />
          <LatestDisputes />
      </Grid>
    </Container>
  )
}
