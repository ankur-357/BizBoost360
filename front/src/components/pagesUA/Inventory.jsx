import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton"
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems, secondaryListItems } from "../dashboard/MUI/ListaItems";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
//import FormEmployes from "./formEmployes";
import EmployeesViews from "./EmployesViews";
import { getEmployesAction } from "../../redux/actionsCompany";
import { useEffect,useState } from "react"
import {useSelector } from "react-redux"

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme();

function ControlEmpleados() {
  const { user } = useSelector((state) => state.user);
  const localUser = JSON.parse(localStorage.getItem('user'));
  const [employes,setEmployes] = useState([])
  console.log(localUser)
  useEffect(()=>{
    if (localUser.companyID) {
      getEmployes();
    }
  },[localUser.companyID])

  const getEmployes = async () => {
      const data = await  getEmployesAction(localUser.companyID)
      console.log(data)
      const newEployes = data.filter(employes => employes._id !== user.id )
      setEmployes(newEployes)
  }

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="absolute"
          open={open}
          sx={{ backgroundColor: "#4dd0e1" }}
        >
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              <Link to="/">
                <div className="header-down-left">
                  <img
                    className="BigBiz360-icon"
                    src={Logo}
                    alt="BizBoost360 logo"
                    width="45"
                  />
                  <p className="BizBoost360">BizBoost360</p>
                </div>
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: "#e6e3e3cc",
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          {/* Component Container */}
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <section className="employes__container">
        <EmployeesViews employes={employes} getEmployes={getEmployes }/>
        </section>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
export default ControlEmpleados;

// const ControlEmpleadosX = () => {
//   const user = useSelector(state => state.user.user)
//     const [employes,setEmployes] = useState([])
    
//     useEffect(()=>{
//         getEmployes()
//     },[user.companyID])

//     const getEmployes = async () => {
//         const data = await  getEmployesAction(user.companyID)
//         const newEployes = data.filter(employes => employes._id !== user.id )
//         setEmployes(newEployes)
//     }

  
//   return (
//     <DashboardPage>
//       <section className="employes__container">
//         <EmployeesViews employes={employes} getEmployes={getEmployes }/>
//         <FormEmployes getEmployes={getEmployes }/>
//       </section>
//     </DashboardPage>
//   );
// };