//import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { sortByStockAction } from "../../redux/actionsProducts";

const SortByStock = () => {
    const dispatch = useDispatch();
    const [orderValue, setOrderValue] = useState('');

    const handlerSortByStock = (e) => {
        dispatch(sortByStockAction(e.target.value));
        setOrderValue('');
    }

    return (
        <div className="text-md font-roboto text-gray-400">
            <select name="sortStock" onChange={handlerSortByStock} value={orderValue}>
                <option value='' readOnly hidden>Stock</option>
                <option value="Asc"> - a +</option>
                <option value="Desc">+ a -</option>
            </select>
        </div>
    )
};

export default SortByStock;