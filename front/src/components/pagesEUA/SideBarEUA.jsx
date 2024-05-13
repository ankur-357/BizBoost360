import { Typography } from "@mui/material";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useState, useEffect } from "react";
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import logo from "../../assets/logo.svg";
import { userLogoutAction } from "../../redux/actionsUser";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsAction } from "../../redux/actionsProducts";
import { getCompanyAction } from "../../redux/actionsCompany";
import { getSalesAction, getSalesCount } from "../../redux/actionSales"
import { useEUA } from "../EUA/hooks/useEUA"

const SideBarEUA = () => {
  const { setBill } = useEUA()
  const { user } = useSelector((state) => state.user);
  const localUser = JSON.parse(localStorage.getItem('user'));
  const [collapsedBar, setCollapsedBar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(user.companyID)
  const { company } = useSelector((state) => state.company);
  console.log(company._id)
  useEffect(() => {
    if (!user) return
    dispatch(getAllProductsAction(localUser.companyID))
    dispatch(getCompanyAction(localUser.companyID))
    dispatch(getSalesAction(localUser.companyID))
  }, [dispatch, user])

  useEffect(() => {
    if (!localUser) return
    const fetchData = async () => {
      const res = await getSalesCount(localUser.companyID)
      setBill(res)
    }
    fetchData()
  }, [])

  const handleCollapsed = () => {
    if (collapsedBar === false) { setCollapsedBar(true) }
    if (collapsedBar === true) { setCollapsedBar(false) }
  }

  const handleLogout = async (event) => {
    event.preventDefault();
    localStorage.removeItem('user')
    dispatch(userLogoutAction())
    navigate("/");
    window.location.reload(true);
  }
  return (
    // <Box>
    <Sidebar
      rootStyles={{
        minHeight: "100vh",
        fontSize: ".9em",
        boxShadow: " 0px 4.46881px 4.46881px 0px rgba(0, 0, 0, 0.25)"
      }}
      collapsed={collapsedBar}>
      <Menu>
        <MenuItem
          icon={<MenuRoundedIcon />}
          onClick={handleCollapsed}
          rootStyles={{ color: "#00bcd4", marginTop: "1em" }} >

        </MenuItem>
      </Menu>
      <Menu
        rootStyles={{ marginTop: "1em" }}
        menuItemStyles={{
          button: {
            [`&.active`]: {
              color: "#B2EBF2",
            },
          },
        }}
      >
        <MenuItem
          icon={<AdminPanelSettingsRoundedIcon />}
          component={<Link to="/EUA" />}
          rootStyles={{ color: "grey" }}>
          <Typography
            sx={{
              color: "black",
              fontSize: "1em",
              ["&:hover"]: { color: "#00BCD4" },
            }}
          >
            EUA
          </Typography>
        </MenuItem>

        <MenuItem
          icon={<img src={logo}
            alt="logo"
            className="logo-sidebar" />}
          component={<Link to="/" />}
          rootStyles={{ justifyContent: "center", marginTop: "6em" }}>
          <h3>BizBoost360</h3>
        </MenuItem>

      </Menu>
      <Menu rootStyles={{ marginTop: "4em" }}>
        <MenuItem
          icon={<ExitToAppRoundedIcon />}
          component={<Link to="/" />}
          onClick={handleLogout} >Salir</MenuItem>
      </Menu>
    </Sidebar>
    // </Box>
  );
};
SideBarEUA.displaName = "SideBar";
export default SideBarEUA;
