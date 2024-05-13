import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from "@mui/icons-material/People";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import { Link } from "react-router-dom";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import ListRoundedIcon from "@mui/icons-material/ListRounded";
import Logout from "./Logout";

export const mainListItems = (
  <React.Fragment>
    <Link to="/ua/landing">
      <ListItemButton>
        <ListItemIcon>
          <AdminPanelSettingsRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Home Admin" />
      </ListItemButton>
    </Link>
    <Link to="/ua/product/catalogo">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Catalogue" />
      </ListItemButton>
    </Link>
    <Link to="/ua/product/create">
      <ListItemButton>
        <ListItemIcon>
          <PostAddRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Create Product" />
      </ListItemButton>
    </Link>
    <Link to="/ua/product/edit">
      <ListItemButton>
        <ListItemIcon>
          <AutoFixHighRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Edit Product" />
      </ListItemButton>
    </Link>
    <Link to="/ua/control-eua">
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="User Control" />
      </ListItemButton>
    </Link>
    <Link to="/ua/product/inventory">
      <ListItemButton>
        <ListItemIcon>
          <ListRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Inventory" />
      </ListItemButton>
    </Link>

  </React.Fragment>
);

export const secondaryListItems = (

  <React.Fragment>
    <Logout />
  </React.Fragment>
);