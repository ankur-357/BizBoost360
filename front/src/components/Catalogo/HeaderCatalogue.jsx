//import React from "react";
import SearchBar from "../Search/SearchBar";
import FilterByCategory from "../Filters/FilterByCategory";
import SortByName from "../Sorts/SortByName";
import SortByPrice from "../Sorts/SortByPrice";
import SortByStock from "../Sorts/SortByStock";
import { useSelector } from "react-redux";
import logoFlecha from "../../assets/Imagenes/logoFlecha.png"; // Assuming the correct path to your image
import ButtonReset from "../Utils/Buttons/ButtonReset";

const HeaderCatalogue = ({ setSearchQuery }) => {
    const company = useSelector(state => state.company.company);
    const nameCompany = company ? company.name : null;
    const logo = company ? company?.image?.url : logoFlecha;

    return (
        <div className="w-100% flex flex-col">
            <div className="flex justify-center items-center gap-4 max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center font-barlow-condensed text-gray-700 font-semibold">{nameCompany}</h1>
                <img className="w-14 h-14 rounded-full" src={logo} alt="logo" />
            </div>
            <div className="py-4 px-8 border-2 border-gray-200 shadow shadow-gray-500 flex flex-row flex-wrap justify-between bg-white">
                <SearchBar setSearchQuery={setSearchQuery} />
                <FilterByCategory />
                <SortByName />
                <SortByPrice />
                <SortByStock />
                <ButtonReset />
            </div>
        </div>
    );
}

export default HeaderCatalogue;
