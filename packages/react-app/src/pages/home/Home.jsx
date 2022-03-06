import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css"
import { data } from "../..//dummyData.js"
import LatestStakes from "../../components/LatestStakes";
import LatestDisputes from "../../components/latestDisputes";
import { Container, Grid } from "@mui/material";



export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <FeaturedInfo />
      <Chart data={data} title="Home Title" grid dataKey="name" />
      <Grid container spacing={2}>
          <LatestStakes />
          <LatestDisputes />
      </Grid>
    </Container>
  )
}
