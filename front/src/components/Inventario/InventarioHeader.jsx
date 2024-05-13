import { useSelector } from "react-redux";
import SearchBar from "../Search/SearchBar";
import logoFlecha from "../../assets/Imagenes/logoFlecha.png"
import ButtonReset from "../Utils/Buttons/ButtonReset";

const InventarioHeader = ({ setSearchQuery }) => {
    const company = useSelector(state => state.company.company);
    //console.log("COMPANY", company);
    const nameCompany = company ? company.name : null;
    const logo = company ? company.image.url : logoFlecha;


    return (
        <div className="w-full m-6 flex flex-col">
            <div className="flex justify-center items-center gap-4">
                <h1 className="text-4xl text-center font-barlow-condensed text-gray-700 font-semibold">{nameCompany}</h1>
                <img className="w-14 h- rounded-full" src={logo} alt="logo" />
            </div >
            <div className="flex flex-row justify-between mx-6 mb-0 py-2 px-8 border-2 border-gray-200 shadow shadow-gray-500 bg-white w-auto">
                <SearchBar setSearchQuery={setSearchQuery} />
                <ButtonReset />
            </div>
        </div>
    )
}

export default InventarioHeader;