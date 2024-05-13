//import React from "react";
import PropTypes from "prop-types";

const SearchBar = ({ setSearchQuery }) => {
    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };
    return (
        <input
            type="text"
            placeholder="Search items..."
            onChange={handleInputChange}
            className="text-md font-roboto"
        />
    );
};

SearchBar.propTypes = {
    setSearchQuery: PropTypes.func.isRequired // Define setSearchQuery as a required function prop
};

export default SearchBar;
