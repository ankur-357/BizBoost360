import { useState } from "react";
import { useDispatch } from "react-redux";
import { sortByNameAction } from "../../redux/actionsProducts";


const SortByName = () => {
    const dispatch = useDispatch();
    const [orderValue, setOrderValue] = useState('');

    const handlerSortByName = (e) => {
        dispatch(sortByNameAction(e.target.value));
        setOrderValue('');
    }

    return (
        <div className="text-md font-roboto text-gray-400">
            <select name="sortName" onChange={handlerSortByName} value={orderValue}>
                <option value='' readOnly hidden >Product</option>
                <option value="Asc" > a - z </option>
                <option value="Desc"> z - a </option>
            </select>
        </div>
    )
}

export default SortByName;