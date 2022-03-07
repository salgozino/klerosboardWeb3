import { Card, CardContent, List, ListItem, ListItemText, Skeleton, Typography, Link } from "@mui/material";
import { Link as LinkRouter} from "react-router-dom";

export default function InfoCardList({ info, loading, baseURL }) {

  return (
    <Card sx={{flex: 1,
      borderRadius: '20',
      boxShadow: '5'
       }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom align='center'>
          {info.title}
        </Typography>
        <List dense={true}>
          {loading
            ? <Skeleton variant="rectangular" width={210} height={118} />
            : info.values.map((item, i) => {
              return (
                <ListItem key={i}>
                  <ListItemText
                    primary={baseURL ?
                      <Link component={LinkRouter} to={baseURL + '/' + item}>{item}</Link>
                      : item
                    }
                  />
                </ListItem>
              );
            })
          }
        </List>
      </CardContent>
    </Card >
  )
}