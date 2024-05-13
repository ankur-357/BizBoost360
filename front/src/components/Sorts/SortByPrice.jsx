//import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { sortByPriceAction } from "../../redux/actionsProducts";

const SortByPrice = () => {
    const dispatch = useDispatch();
    const [orderValue, setOrderValue] = useState('');

    const handlerSortByPrice = (e) => {
        console.log('dispatch the action with value: ', e.target.value);
        dispatch(sortByPriceAction(e.target.value));
        setOrderValue('');
    }


    return (
        <div className="text-md font-roboto text-gray-400">
            <select name="sortPrice" onChange={handlerSortByPrice} value={orderValue}>
                <option value='' readOnly hidden >Price</option>
                <option value="Asc" > - a + </option>
                <option value="Desc"> + a - </option>
            </select>
        </div>
    )
};

export default SortByPrice