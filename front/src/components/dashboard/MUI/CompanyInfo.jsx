import { getCompanyAction } from "../../../redux/actionsCompany";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Box } from "@mui/material";
import "./CompanyInfo.css"

const CompanyInfo = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const localUser = JSON.parse(localStorage.getItem('user'));
  console.log(localUser)
  const { company } = useSelector((state) => state.company);
  const { products } = useSelector((state) => state.products);
  console.log("ID", company._id);
  useEffect(() => {
    if (user) {
      console.log(localUser)
      console.log(company._id)
      dispatch(getCompanyAction(localUser.companyID));
    }
  }, [user, dispatch]);

  return (
    <>
      {company && company.image ? (
        <Box >
          <Box
            sx={{
              // width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              mt: 2,
              mb: 3,
              fontFamily: "'Barlow Condensed', sans-serif",
              background: "white",
              opacity: ".7",
            }}
          >
            <div>
              <h1 className="company-name">{company.name}</h1>
              <p>ID: {company._id}</p>
            </div>
            <div className="image-company">
              <img src={company?.image?.url} className="img-company" />
            </div>
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default CompanyInfo;
