//import React from "react";
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch } from 'react-redux';
import { deleteProductAction } from '../../../redux/actionsProducts';
import PropTypes from 'prop-types';

const ButtonDelete = (props) => {
    const dispatch = useDispatch();
    const productId = props.id;

    const handlerDelete = () => {
        //console.log("delete product id: ", props.id);
        dispatch(deleteProductAction(productId));
    }

    return (
        <Button variant="text" startIcon={<DeleteForeverIcon className="text-red-600" />} onClick={handlerDelete}
            sx={{
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.1)',
                },
            }}
        />
    );

}
// Define prop types for ButtonDelete component
ButtonDelete.propTypes = {
    id: PropTypes.string.isRequired // Assuming id is a string, adjust as needed
};
export default ButtonDelete;