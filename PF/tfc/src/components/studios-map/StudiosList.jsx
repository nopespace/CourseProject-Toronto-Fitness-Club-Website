import * as React from "react";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

const StudiosList = (props) => {
    const rows = props.studios
    const columns = [
        { field: 'order', headerName: 'Number', sortable: false, width: 70 },
        { field: 'name', headerName: 'Studio Name', sortable: false, flex: 1 },
        { field: 'address', headerName: 'Address', sortable: false, flex: 1 },
        { field: 'phone_number', headerName: 'Phone Number', sortable: false, flex: 0.5},
    ];

    const handleRowClick = () => {
        // TODO:
        alert('go to specific studio page!')
    }

    return (
        <Box style={{ height: '50vh', width: '80%', margin: 20,  }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[10]}
                disableExtendRowFullWidth={false}
                density='comfortable'
                sx={{
                    // https://mui.com/x/react-data-grid/style/#styling-rows
                    boxShadow: 2,
                    border: 2,
                    borderColor: 'lightGray',
                    '& .MuiDataGrid-row:hover': {
                      color: 'primary.main',
                      cursor: 'pointer'
                    },
                  }}
                onRowClick={handleRowClick}
                // checkboxSelection
            />
        </Box>
    )
}

export default StudiosList;