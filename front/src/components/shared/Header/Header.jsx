import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Header.component.css";
import { MdMenu } from "react-icons/md";
import Logo from "../../../assets/logo.png";
// import { FaUserCircle } from "react-icons/fa"; // Asegúrate de importar FaUserCircle si no lo has hecho ya

const Header = ({ showDown = true }) => {
  // false: eliminates "register" and "login" (For registration and login routes)
  const headerDownRigthClass = showDown
    ? "header-down-rigth"
    : "header-down-rigth-none";

  const [isActive, setIsActive] = useState(false);
  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <header className="header">
      <div className="header-up"></div>
      <div className="header-down">
        <Link to="/">
          <div className="header-down-left">
            <img className="BigBiz360-icon" src={Logo} alt="BizBoost360 logo  " />
            <h1>BizBoost360</h1>
          </div>
        </Link>
        <div className={headerDownRigthClass}>
          <Link className="none" to="/register-user">
            Check in
          </Link>
          <Link className="none" to="/login">
            Log in
          </Link>
        </div>
        <div className={showDown === false ? "none" : ""}>
          <MdMenu onClick={toggleMenu} className="menu-mobile-icon" />

          <div className={isActive ? "navbar-mobile" : "mobile"}>
            <Link to="/register-user">Check in</Link>
            <Link to="/login">Log in</Link>

          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  showDown: PropTypes.bool // Define showDown as a boolean prop
};
export default Header;
