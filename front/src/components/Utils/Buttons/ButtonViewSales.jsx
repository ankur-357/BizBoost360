//import React from "react";
import Button from '@mui/material/Button';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { sweetAlertsMessage } from '../alerts/sweetAlerts';
import PropTypes from 'prop-types';

const ButtonViewSales = (props) => {

    const handlerSales = () => {
        sweetAlertsMessage('Page in development', `We can't show sales analytics for ${props.name}`);
    }

    return (
        <Button variant="text" startIcon={<QueryStatsIcon className="text-gray-700" />} onClick={handlerSales}
            sx={{
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.1)',
                },
            }}
        />
    );
}
// Define prop types for ButtonViewSales component
ButtonViewSales.propTypes = {
    name: PropTypes.string.isRequired // Assuming name is a string, adjust as needed
};
export default ButtonViewSales;