import { Link } from "react-router-dom";
import "./Hero.component.css";

const Hero = () => {
  return (
    <div className="hero">
      <h1 className="hero-h1">Manage your inventory and sales 120% faster with BizBoost360</h1>
      <h2 className="hero-h2">
        Its proven that businesses using BizBoost360s services increase their companys performance by up to 120%.
      </h2>
      <div className="btns">
        <button>
          <Link className="btn-register" to="/register-user">Sign Up</Link>
        </button>
        <button>
          <Link className="btn-login" to="/login">Login</Link>
        </button>
      </div>
    </div>
  );
};

export default Hero;
