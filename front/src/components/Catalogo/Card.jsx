import PropTypes from 'prop-types'; // Import PropTypes
//import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {

    return (
        <Link to={`/ua/product/detail/${props.id}`}>
            {/* {console.log(" ID PROPS: ", props.id)} */}
            <div className="w-100% h-auto m-4 bg-white rounded-xl flex flex-col justify-center items-center border-2 border-gray-200 shadow shadow-gray-500">
                <img className="w-52 max-h-36 m-4 rounded-xl shadow shadow-gray-400" src={props.image.url} alt={`imagen de ${props.name}`} />
                <div className="w-full text-left ml-14">
                    <h1 className="text-lg font-semibold font-barlow-condensed" >{props.name}</h1>
                </div>
                <div className="w-44 h-auto m-4 mt-0 font-roboto">
                    <div className="flex flex-row justify-evenly text-sm">
                        {props.category.length && props.category.map((c, index) => <h3 key={index}>{c}</h3>)}
                    </div>
                    <div className="flex flex-row justify-between text-[#00bcd4]">
                        <h3>Price</h3>
                        <h3>{props.price}{props.currency}</h3>
                    </div>
                </div>
            </div>
        </Link>
    )
};

// Define prop types for Card component
Card.propTypes = {
    id: PropTypes.string.isRequired, // Define id as a required string prop
    image: PropTypes.object.isRequired, // Define image as a required object prop
    name: PropTypes.string.isRequired, // Define name as a required string prop
    category: PropTypes.arrayOf(PropTypes.string).isRequired, // Define category as a required array of strings prop
    price: PropTypes.number.isRequired, // Define price as a required number prop
    currency: PropTypes.string.isRequired // Define currency as a required string prop
};

export default Card;
