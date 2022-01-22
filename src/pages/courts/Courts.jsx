import "./courts.css"
import { DataGrid } from "@mui/x-data-grid"
import { Link } from "@mui/material";

export default function Courts() {

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'courtName', headerName: 'Court Name', width: 100, renderCell: (params) => {
      return (<a href={"courts/"+params.row.id}>{params.row.courtName}</a>)
    }},
    { field: 'totalDisputes', headerName: 'Total Disputes', width: 100, type: 'number'},
    {
      field: 'openDisputes',
      headerName: 'Open Disputes',
      type: 'number',
      width: 100,
    },
  ];
  
  const rows = [
    { id: 1, courtName: 'Snow', totalDisputes: 10, openDisputes: 35 },
    { id: 2, courtName: 'Lannister', totalDisputes: 10, openDisputes: 42 },
    { id: 3, courtName: 'Lannister', totalDisputes: 10, openDisputes: 45 },
    { id: 4, courtName: 'Stark', totalDisputes: 10, openDisputes: 16 },
    { id: 5, courtName: 'Targaryen', totalDisputes: 10, openDisputes: null },
    { id: 6, courtName: 'Melisandre', totalDisputes: 0, openDisputes: 150 },
    { id: 7, courtName: 'Clifford', totalDisputes: 4, openDisputes: 44 },
    { id: 8, courtName: 'Frances', totalDisputes: 56, openDisputes: 36 },
    { id: 9, courtName: 'Roxie', totalDisputes: 13, openDisputes: 65 },
  ];


  return (
    <div className="courts">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={50}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  )
}
