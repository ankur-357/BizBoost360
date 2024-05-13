//import React from "react";
import Button from '@mui/material/Button';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useNavigate } from 'react-router-dom';

const ButtonEdit = () => {
    const navigate = useNavigate();

    const handlerEdit = () => {
        navigate('/ua/product/edit');
    }

    return (
        <Button variant="text" startIcon={<BorderColorIcon className="text-blue-600" />} onClick={handlerEdit}
            sx={{
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.1)',
                },
            }}
        />
    );

}

export default ButtonEdit;