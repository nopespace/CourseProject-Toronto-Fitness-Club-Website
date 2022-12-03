import * as React from "react";
import { DataGrid } from '@mui/x-data-grid';

const StudiosList = (props) => {
    const columns = [
        { field: 'order', headerName: 'Number', sortable: false, width: 70 },
        { field: 'name', headerName: 'Studio Name', sortable: false, width: 130 },
        { field: 'address', headerName: 'Address', sortable: false, width: 160 },
        {
          field: 'phone_number',
          headerName: 'Phone Number',
          sortable: false,
          width: 110,
        //   valueGetter: (params) =>
        //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
      ];

    const rows = []

    const {
        name,
        address,
        images,
    } = props;
    return (
        <div>
            <image src={images[0]} />
            <h1>{name}</h1>
            <h2>{address}</h2>
        </div>
    )
}

export default StudiosList;