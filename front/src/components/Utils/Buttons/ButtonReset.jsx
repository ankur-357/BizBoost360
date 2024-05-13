//import React from "react";
import { useDispatch } from "react-redux";
import { getAllProductsAction } from "../../../redux/actionsProducts";
import Button from '@mui/material/Button';
import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined';

const ButtonReset = () => {
    const dispatch = useDispatch();
    //const { user } = useSelector(state => state.user);
    //const { company } = useSelector(state => state.company);
    const userLocal = JSON.parse(localStorage.getItem('user'));
    //const companyId = userLocal ? userLocal.companyID[0] : user.companyID;
    console.log(userLocal)

    const handlerReset = () => {
        dispatch(getAllProductsAction(userLocal.companyID))
    }


    return (
        <Button variant="text" startIcon={<RotateLeftOutlinedIcon fontSize="large" />} onClick={handlerReset}
            sx={{
                transition: 'transform 0.2s ease-in-out',
                '&:hover': { transform: 'scale(1.1)' },
            }}
        > reset </Button>
    )
}

export default ButtonReset