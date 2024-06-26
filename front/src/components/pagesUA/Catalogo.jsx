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
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems, secondaryListItems } from "../dashboard/MUI/ListaItems";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ButtonBack from "../Utils/Buttons/ButtonBack";
import HeaderCatalogue from "../Catalogo/HeaderCatalogue";
import CardsContainer from "../Catalogo/CardsContainer";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductsAction } from "../../redux/actionsProducts";
import { getCompanyAction } from "../../redux/actionsCompany";
import Spinner from "../Utils/Spinner";

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

export default function Catalogo() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const userLocal = JSON.parse(localStorage.getItem("user"));

  const companyId = userLocal ? userLocal.companyID[0] : user.companyID;

  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    const dataUser = localUser ? localUser : user;
    console.log(dataUser)
    if (dataUser) {
      console.log(dataUser)
      dispatch(getAllProductsAction(dataUser.companyID));
      dispatch(getCompanyAction(dataUser.companyID));
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [dispatch, companyId, user, isLoading]);

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
                    alt="BizBoost360 logo "
                    width="45"
                  />
                  <p className="BizBoost360">BizBoost360</p>
                </div>
              </Link>
            </Typography>
            {/* <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
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
          {/* Container de Componente */}
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3} sx={{ display: "flex", flexDirection: "column" }}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "10em",
                  }}
                >
                  <HeaderCatalogue setSearchQuery={setSearchQuery} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "30em",
                  }}
                >
                  <div className="w-full">
                    <div className="mt-5 ml-10">
                      <ButtonBack />
                    </div>
                    {isLoading ? (
                      <Spinner />
                    ) : (
                      <div>
                        <CardsContainer searchQuery={searchQuery} />
                      </div>
                    )}
                  </div>
                </Paper>
              </Grid>

              {/* <Grid item xs={12}>
                <Paper
                  sx={{ p: 2, display: "flex", flexDirection: "column" }}
                ></Paper>
              </Grid> */}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

// function CatalogoX() {
//   const dispatch = useDispatch();

//   const { user } = useSelector((state) => state.user);
//   const userLocal = JSON.parse(localStorage.getItem("user"));

//   const companyId = userLocal ? userLocal.companyID[0] : user.companyID;

//   const [searchQuery, setSearchQuery] = useState("");
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const localUser = JSON.parse(localStorage.getItem("user"));
//     const dataUser = localUser ? localUser : user;
//     if (dataUser) {
//       dispatch(getAllProductsAction(companyId));
//       dispatch(getCompanyAction(companyId));
//       setTimeout(() => {
//         setIsLoading(false);
//       }, 2000);
//     }
//   }, [dispatch, companyId, user, isLoading]);

//   return (
//     <DashboardPage>
//       <div className="w-full">
//         <div className="mt-10 ml-10">
//           <ButtonBack />
//         </div>
//         {isLoading ? (
//           <Spinner />
//         ) : (
//           <div>
//             <HeaderCatalogue setSearchQuery={setSearchQuery} />
//             <CardsContainer searchQuery={searchQuery} />
//           </div>
//         )}
//       </div>
//     </DashboardPage>
//   );
// }

// export default Catalogo;
