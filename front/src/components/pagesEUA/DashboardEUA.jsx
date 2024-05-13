import { Box } from "@mui/material";
import Header from "../shared/Header/Header";
import SideBarEUA from "./SideBarEUA";
import PropTypes from "prop-types";

const DashboardEUA = ({ children }) => {

  return (
    <>
      <Header />
      <Box sx={{ display: "flex" }}>
        <SideBarEUA /> 
        {children}
      </Box>
    </>
  );
};
DashboardEUA.propTypes = {
  children: PropTypes.element,
};
export default DashboardEUA;