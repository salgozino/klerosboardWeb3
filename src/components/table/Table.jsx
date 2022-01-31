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

export default function Courts({columns, rows, loading}) {
  return (
  <DataGrid
    rows={rows}
    columns={columns}
    pageSize={50}
    rowsPerPageOptions={[5, 50]}
    loading={loading}
    components={{LoadingOverlay: CustomLoadingOverlay}}/>
  )
}
