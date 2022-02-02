import { DataGrid, GridOverlay } from "@mui/x-data-grid"
import { LinearProgress } from "@mui/material";


function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: 'absolute', top: 0, width: '100%' }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}

export default function Courts({columns, rows, loading, defaultSort}) {
  return (
    <div style={{height: '100%', width: '100%'}}>
      <DataGrid
        rows={loading?{}:rows}
        columns={columns}
        pageSize={50}
        rowsPerPageOptions={[5, 50]}
        loading={loading}
        components={{LoadingOverlay: CustomLoadingOverlay}}
        initialState={{
          sorting: {
            sortModel: defaultSort? [defaultSort] : [],
          },
        }}
        />
    </div>
  )
}
