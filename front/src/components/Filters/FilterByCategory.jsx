import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { filterByCategoryAction } from "../../redux/actionsProducts"

const FilterByCategory = () => {
    const products = useSelector(state => state.products.products)
    //console.log("PRODUCTOS", products);

    //genero el array que contenga todas las categorias, estandarizadas, sin repetir, ordenadas alfabticamente
    const concatCategories = products.length ? products.flatMap(product => product.category).flat() : [];
    // console.log("CONCAT", concatCategories);
    const capitalLetterArray = concatCategories.length ? concatCategories.map(category => category[0]?.toUpperCase() + category.slice(1)?.toLowerCase()) : [];
    // console.log("CAPITAL LETER", capitalLetterArray);
    const notRepeatCategories = capitalLetterArray.length ? capitalLetterArray.filter((category, index) => capitalLetterArray.indexOf(category) === index) : [];
    // console.log("NOT REPEAT", notRepeatCategories);
    const allCategoriesSort = notRepeatCategories.length ? notRepeatCategories.sort((a, b) => a.localeCompare(b)) : [];
    // console.log("ALL SORT", allCategoriesSort);
    const dispatch = useDispatch();

    const filterHandler = (e) => {
        dispatch(filterByCategoryAction(e.target.value));
        //console.log("despacha la action");
        //console.log("value enviado: ", e.target.value);
    }


    return (
        <div className="text-md font-roboto text-gray-400">
            <select name="categoryFilter" onChange={filterHandler}>
                {/* <option value='' readOnly hidden> Categorías</option> */}
                <option value='all'>Categories</option>
                {allCategoriesSort && allCategoriesSort.map((category, index) => {
                    return (
                        <option key={index} value={category}>{category}</option>
                    )
                })}
            </select>
        </div>
    )
}

export default FilterByCategory;