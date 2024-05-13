import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
//import { useState, useEffect } from "react";
// import InventarioCard from "./InventarioCard";
import ButtonEdit from "../Utils/Buttons/ButtonEdit";
import ButtonDelete from "../Utils/Buttons/ButtonDelete";
import ButtonViewSales from "../Utils/Buttons/ButtonViewSales";
import ConditionalState from "../Utils/ConditionalState";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
import FilterByCategory from "../Filters/FilterByCategory";
import SortByPrice from "../Sorts/SortByPrice";
import SortByStock from "../Sorts/SortByStock";
import SortByName from "../Sorts/SortByName";

export const InventarioList = ({ searchQuery }) => {
  const { products } = useSelector(state => state.products)

  const filteredProducts = products.length ? products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery?.toLowerCase())
  ) : [];

  const productsFormatted = filteredProducts.length ? filteredProducts.map((product, index) => {
    const name = product.name;
    const nameFormatted = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    return {
      ...product,
      name: nameFormatted,
      key: index
    }
  }) : [];


  const { company } = useSelector(state => state.company);
  const nameCompany = company ? company.name : null;

  return (
    <div className="flex flex-row justify-between bg-white px-8 w-full">
      {!productsFormatted.length ? (
        searchQuery !== "" && searchQuery !== products.name ? (
          <div className="w-100vw bg-white rounded-2xl text-center py-40 px-96 mx-10 font-roboto text-gray-500">
            <h2 className="text-xl font-semibold">Uhh...</h2>
            <h3 className="text-sm">
              There are no products with that name
            </h3>
          </div>
        ) : (
          <div className="w-100vw bg-white rounded-2xl text-center py-40 px-96 mx-10">
            <h2 className="text-xl font-semibold font-roboto text-gray-500">Uhh...</h2>
            <h3 className="text-sm font-roboto text-gray-500">
              There are no products loaded for your company yet
            </h3>
            <h1 className="text-2xl font-semibold font-barlow-condensed text-gray-600">{nameCompany}</h1>
            <Link to="/ua/product/create" className="text-lg font-semibold font-roboto text-[#4DD0E1] hover:text-[#00bcd4]">
              Load first!
            </Link>
          </div>
        )
      ) : (
        <div className="overflow-x-auto">
          <TableContainer>
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow sx={{ minWidth: 800 }} className="py-4 border-bottom-4 border-gray-400 shadow shadow-gray-700 flex flex-row justify-between bg-white">
                  <TableCell className="w-auto border-0" align="center">
                    <span className="text-md font-roboto text-gray-400">State</span>
                  </TableCell>
                  <TableCell className="w-auto border-0" align="center"><FilterByCategory /></TableCell>
                  <TableCell className="w-auto border-0" align="center"><SortByName /></TableCell>
                  <TableCell className="w-auto border-0" align="center">
                    <span className="text-md font-roboto text-gray-400">Currency</span>
                  </TableCell>
                  <TableCell className="w-auto border-0" align="center"><SortByPrice /></TableCell>
                  <TableCell className="w-auto border-0" align="center"><SortByStock /></TableCell>
                  <TableCell className="w-auto border-0" align="center">
                    <span className="text-md font-roboto text-gray-400">Actions</span>
                  </TableCell>
                </TableRow>
              </TableHead>
              {/* &nbsp; */}
              <TableBody>
                {productsFormatted.map((prod, index) => (

                  <TableRow key={index} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}>
                    <TableCell align="center" className="w-auto"><ConditionalState stock={prod.quantity} /></TableCell>
                    <TableCell align="right" className="w-auto">
                      <div className="flex flex-row justify-between">
                        {prod.category.length && prod.category.map((c, index) => <h3 key={index}>{c}</h3>)}
                      </div>
                    </TableCell>
                    <TableCell align="right" className="w-auto">
                      <div className="flex flex-row justify-between gap-2">
                        <Link to={`/ua/product/detail/${prod.id}`} className="pt-3 text-[#00bcd4] hover:text-[#00bcd4]">{prod.name}</Link>
                        <img src={prod.image.url} alt={prod.name} className="w-14 h-10 rounded-xl shadow shadow-gray-400" />
                      </div>
                    </TableCell>
                    <TableCell align="center" className="w-auto">{prod.currency}</TableCell>
                    <TableCell align="center" className="w-auto">{prod.price}</TableCell>
                    <TableCell align="center" className="w-auto">{prod.quantity}</TableCell>
                    <TableCell align="center" className="w-auto">
                      <ButtonEdit />
                      <ButtonDelete id={prod._id} />
                      <ButtonViewSales id={prod._id} name={prod.name} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

      )}
    </div>
  )
}

export default InventarioList;