// import React, { useState } from "react";
// import logo from "../../assets/Imagenes/imgEmpresa.jpg";

import imageLanding from "../../assets/LandingNew/Landing.jpeg";

import { useDispatch, useSelector } from "react-redux";
import { userLoginAction } from "../../redux/actionsUser";
import { useEffect, useState } from "react";
// import {  userLoginAction } from "../../redux/actionsUser";//Recomiendo usar esta action, está en la carpeta correcta y la respuesta es la que necesitamos para manejear la data
import { useNavigate } from "react-router-dom";
import Header from "../shared/Header/Header";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [userLogin, setUserLogin] = useState();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  // console.log("USER STATE LOGIN", user);
  const handleInputChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  // useEffect(() => {
  //   setUserLogin(user)
  //   //levanto los datos del usario cuando se monta/actualiza el compnente
  //   const savedUser = JSON.parse(localStorage.getItem("user"));
  //   if (savedUser) {
  //     navigate(savedUser.UA ? "/ua/landing" : (savedUser.EUA ? "/eua/dashboard" : null));
  //   }
  // }, [user, userLogin, navigate]);

  // const handleLogin = async(e) => {
  //   e.prevent.default;
  //   const res = await dispatch(userLoginAction(loginData));
  //   if (res && (res.data.EUA || res.data.UA)) {
  //     // Guardar los datos del usuario en localStorage si el login es exitoso
  //     localStorage.setItem("user", JSON.stringify(res.data));
  //     navigate(res.data.UA ? "/ua/landing" : "/eua/dashboard");
  //   } else {
  //     setLoginData({
  //     email: "",
  //     password: "",
  //     });
  //     navigate("/register-company")
  //   }
  // } 

  const handleLogin = async (event) => {
    event.preventDefault();
    const res = await dispatch(userLoginAction(loginData))
    if (res) {
      localStorage.setItem("user", JSON.stringify(res.data))
      if (!res.data.EUA && !res.data.UA) {
        return navigate("/register-company")
      } else if (res.data.UA) {
        return navigate("/ua/landing")
      } else if (res.data.EUA) {
        return navigate("/eua/dashboard")
      }
    }
    setLoginData({
      email: "",
      password: "",
    });
  };


  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    localUser ? setUserLogin(localUser) : setUserLogin(user);
    if (userLogin) {
      navigate(
        userLogin.UA === true
          ? "/ua/landing"
          : null || userLogin.EUA === true
            ? "/eua/dashboard"
            : null
      );
    }
    // console.log("USER", user);
  }, [user, userLogin, navigate]);

  return (
    <div className="h-screen overflow-hidden">
      <Header showDown={false} />
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 -z-10">
          <img
            src={imageLanding}
            alt="Company background image"
            className="w-full h-screen object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 px-20
        pb-60 overflow-y-auto fixed top-16 right-0 bottom-0 flex flex-col items-center justify-center ">
          <h1 className="mb-10 text-4xl text-center  font-semibold text-white md:text-black">
            User access
          </h1>

          <div className="md:w-[30em]">
            <form
              className="flex flex-col place-content-around gap-6 mx-[1em]"
              onSubmit={handleLogin}
            >
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="Email"
                  className="border border-gray-500 p-2 rounded-lg w-full"
                  id="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col">
                <input
                  type="password"
                  placeholder="Password"
                  className="border border-gray-500 p-2 rounded-lg w-full"
                  id="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleInputChange}
                />
              </div>

              <div className="w-full flex place-content-center text-center mt-10 ">
                <button
                  type="submit"
                  className="w-[150px] h-[40px] bg-[#4DD0E1] hover:bg-[#B2EBF2] text-white hover:text-[#00bcd4] border-[#4DD0E1] font-bold text-sm rounded-md animate-pulse"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Login;

