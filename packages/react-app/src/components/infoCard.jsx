import { ArrowDownward, ArrowUpward } from "@mui/icons-material"
import { Card, CardContent, Link, Skeleton, Typography } from "@mui/material";
import { LinkWithQuery as LinkRouter } from "./LinkWithQuery";




export default function InfoCard({ info, loading, baseURL }) {

  return (
    <Card sx={{flex: 1,
      borderRadius: '20',
      boxShadow: '5'
       }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom align='center'>
          {info.title}
        </Typography>
        {loading ?
        <Skeleton variant="rectangular" width={210} height={118} />
        :
        <>
        <Typography variant="h6" component="div" align='center'>
          {baseURL ?
            <Link component={LinkRouter} to={baseURL + '/' + info.id} variant="body" children={info.value} />
            : info.value
          }
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {info.rate != null ?
            info.rate + info.rate > 0 ? <ArrowUpward /> : <ArrowDownward />
            : null
          }
        </Typography>
        </>
      }
      </CardContent>
    </Card>

  )
}
