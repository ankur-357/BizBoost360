import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { verifyToken } from "../../redux/actionsUser";

const ProtectedRoute = () => {
  const navigate = useNavigate();

  //? CheckLogin
  
  const checkLogin = async () => {
    const cookies = Cookies.get();
    
    if (!cookies || !cookies.token) {
      navigate("/login");
      return false;
    }

    try {
      const res = await verifyToken();

      if (!res.data) {
        navigate("/login");
        return false;
      }

      return true; 
    } catch (error) {
      console.error(error)
      navigate("/login")
      return false
    }
  }

  useEffect(() => {
    const isAuthenticated = async () => {
      const result = await checkLogin()
      if (!result) {
        navigate("/login")
      }
    }

    isAuthenticated()
  }, [navigate])

  return <Outlet />
}

export default ProtectedRoute;
