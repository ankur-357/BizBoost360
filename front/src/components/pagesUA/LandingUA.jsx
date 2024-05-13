import "./LandingUA.css";
import { Box, MenuItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../shared/Header/Header";
import gestionInventario from "../../assets/Imagenes/gestionInventario.jpg";
import { getCompanyAction } from "../../redux/actionsCompany";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const LandingUA = () => {
  const { user } = useSelector((state) => state.user);
  const userLocal = JSON.parse(localStorage.getItem('user'));

  const companyId = userLocal ? userLocal.companyID[0] : user.companyID;
  const { company } = useSelector((state) => state.company);
  console.log(company)
  const dispatch = useDispatch();
  // const { products } = useSelector((state) => state.products);
  console.log("ID", company._id);
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    const dataUser = localUser ? localUser : user;
    console.log(dataUser)
    if (dataUser) {
      dispatch(getCompanyAction(dataUser.companyID));
    }
  }, [user, companyId, dispatch]);

  return (
    <>
      <div style={{ backgroundImage: `url(${gestionInventario})`, backgroundSize: "cover", opacity: ".7" }}>

        <Header showDown={false} />
        {company.image ? (
          <Box sx={{ backgroundColor: "white", opacity: ".7" }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                mt: 2,
              }}
            >
              <div>
                <h1 className="company-name-landingUA">{company.name}</h1>
                <p>ID: {company._id}</p>
              </div>
              <div className="image-company-landingUA">
                <img src={company.image.url} className="landingUA-img-company" />
              </div>
            </Box>

          </Box>
        ) : null}

        <Box
          className="container-box"
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(auto fit, minmax(2, 1fr))",
            gap: "5em",
            justifyContent: "center",
            padding: "2em",
            margin: ".5em 6em",
            position: "relative",
            "@media screen and (max-width: 1080px)": {
              gridTemplateColumns: "repeat(2, 1fr)",
              margin: ".5em 2em",
              gap: "2em",
            },
            "@media screen and (max-width: 650px)": {
              gridTemplateColumns: "1fr",
              margin: "5% auto",
              padding: "0 20%",
              textAlign: "center",
              width: "80%",
            },
          }}
        >
          <Link to="/">
            <MenuItem
              sx={{
                width: "18em",
                height: "9em",
                backgroundColor: "#00bcd4",
                borderRadius: "15px",
                justifyContent: "center",
                ["&:hover"]: { backgroundColor: "#B2EBF2" },
                boxShadow: " 0px 4.46881px 4.46881px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "3em",
                  ["&:hover"]: { color: "#00BCD4" },
                }}
              >
                Home
              </Typography>
            </MenuItem>
          </Link>
          <Link to="/ua/profile">
            <MenuItem
              sx={{
                width: "18em",
                height: "9em",
                backgroundColor: "#00bcd4",
                borderRadius: "15px",
                justifyContent: "center",
                ["&:hover"]: { backgroundColor: "#B2EBF2" },
                boxShadow: " 0px 4.46881px 4.46881px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "3em",
                  ["&:hover"]: { color: "#00BCD4" },
                }}
              >
                My Profile
              </Typography>
            </MenuItem>
          </Link>
          <Link to="/ua/product/analitics">
            <MenuItem
              sx={{
                width: "18em",
                height: "9em",
                backgroundColor: "#00bcd4",
                borderRadius: "15px",
                justifyContent: "center",
                ["&:hover"]: { backgroundColor: "#B2EBF2" },
                boxShadow: " 0px 4.46881px 4.46881px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "3em",
                  ["&:hover"]: { color: "#00BCD4" },
                }}
              >
                Analytics
              </Typography>
            </MenuItem>
          </Link>
          <Link to="/ua/product/catalogo">
            <MenuItem
              sx={{
                width: "18em",
                height: "9em",
                backgroundColor: "#00bcd4",
                borderRadius: "15px",
                justifyContent: "center",
                ["&:hover"]: { backgroundColor: "#B2EBF2" },
                boxShadow: " 0px 4.46881px 4.46881px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "3em",
                  ["&:hover"]: { color: "#00BCD4" },
                }}
              >
                Catalogue
              </Typography>
            </MenuItem>
          </Link>
          <Link to="/ua/product/edit">
            <MenuItem
              sx={{
                width: "18em",
                height: "9em",
                backgroundColor: "#00bcd4",
                borderRadius: "15px",
                justifyContent: "center",
                ["&:hover"]: { backgroundColor: "#B2EBF2" },
                boxShadow: " 0px 4.46881px 4.46881px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "2em",
                  ["&:hover"]: { color: "#00BCD4" },
                }}
              >
                Edit Products
              </Typography>
            </MenuItem>
          </Link>
          <Link to="/ua/product/create">
            <MenuItem
              sx={{
                width: "18em",
                height: "9em",
                backgroundColor: "#00bcd4",
                borderRadius: "15px",
                justifyContent: "center",
                ["&:hover"]: { backgroundColor: "#B2EBF2" },
                boxShadow: " 0px 4.46881px 4.46881px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "2em",
                  ["&:hover"]: { color: "#00BCD4" },
                }}
              >
                New Products
              </Typography>
            </MenuItem>
          </Link>
          <Link to="/ua/control-eua">
            <MenuItem
              sx={{
                width: "18em",
                height: "9em",
                backgroundColor: "#00bcd4",
                borderRadius: "15px",
                justifyContent: "center",
                ["&:hover"]: { backgroundColor: "#B2EBF2" },
                boxShadow: " 0px 4.46881px 4.46881px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "2em",
                  ["&:hover"]: { color: "#00BCD4" },
                }}
              >
                Human Capital
              </Typography>
            </MenuItem>
          </Link>
          <Link to="/ua/product/inventory">
            <MenuItem
              sx={{
                width: "18em",
                height: "9em",
                backgroundColor: "#00bcd4",
                borderRadius: "15px",
                justifyContent: "center",
                ["&:hover"]: { backgroundColor: "#B2EBF2" },
                boxShadow: " 0px 4.46881px 4.46881px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "3em",
                  ["&:hover"]: { color: "#00BCD4" },
                }}
              >
                Inventory
              </Typography>
            </MenuItem>
          </Link>
        </Box>
      </div>
    </>
  );
};

export default LandingUA;

