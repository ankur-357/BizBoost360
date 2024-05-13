// import React from 'react'
import { Route, Routes } from "react-router-dom";
import Landing from "../components/pages/landing/Landing.jsx";
import Inventory from "../components/pagesUA/Inventory";
import LandingUA from "../components/pagesUA/LandingUA";
import Catalogo from "../components/pagesUA/Catalogo";
import Analitics from "../components/pagesUA/Analiticas";
import EUA from "../components/EUA/EUA.jsx";
import DetailsProduct from "../components/pagesUA/DetailsProduct";
import Login from "../components/register/Login";
import RegisterUser from "../components/register/RegisterUser";
// import ProtectedRoute from "../components/Utils/ProtectedRoute.jsx";
import RegisterCompany from "../components/register/RegisterCompany.jsx";
import ControlEmpleados from "../components/pagesUA/ControlEmpleados.jsx";
import ProfileUA from "../components/pagesUA/ProfileUA.jsx";
import DashboardEUA from "../components/pagesEUA/DashboardEUA.jsx";
import EuaProvider from "../components/EUA/context/EUAContext.jsx";
import NotFound from "../components/NotFound/NotFound";
import CreateProductsView from "../components/pagesUA/CreateProducts.jsx";
import EditProductsView from "../components/pagesUA/EditProducts.jsx";

const router = () => {
  return (
    <>
      <EuaProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register-company" element={<RegisterCompany />} />
          <Route path="/register-user" element={<RegisterUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />

          {/* <Route element={<ProtectedRoute/>}> */}
          <Route exact path="/ua/product/catalogo" element={<Catalogo />} />
          <Route exact path="/ua/product/edit" element={<EditProductsView />} />
          <Route exact path="/ua/product/inventory" element={<Inventory />} />
          <Route exact path="/ua/landing" element={<LandingUA />} />
          <Route exact path="/ua/control-eua" element={<ControlEmpleados />} />
          <Route exact path="/ua/profile" element={<ProfileUA />} />
          <Route exact path="/eua/dashboard" element={<DashboardEUA />} />
          <Route exact path="/ua/product/detail/:detailId" element={<DetailsProduct />} />
          <Route exact path="/ua/product/analitics" element={<Analitics />} />
          <Route exact path="/ua/product/create" element={<CreateProductsView />} />
          <Route path="/EUA" element={<EUA />} />
          {/* </Route> */}

        </Routes>
      </EuaProvider>
    </>

  );
};

export default router;
