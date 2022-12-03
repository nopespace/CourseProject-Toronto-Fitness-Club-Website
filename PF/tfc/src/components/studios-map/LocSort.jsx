import { Box, Stack, Typography } from '@mui/material';
import SearchBar from '../SearchBar';

const LocSort = (props) => {
    return (
        <Box width='80%'>
            <SearchBar placeholder='Want to see studios near another place? Enter a postal code OR click on map'/>
        </Box>
    )
}

export default LocSort;