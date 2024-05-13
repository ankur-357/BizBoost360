import { useEffect, useState } from "react";
import ButtonBack from "../../Utils/Buttons/ButtonBack";
import HeaderCatalogue from "../Catalogo/HeaderCatalogue";
import CardsContainer from "../cardsContainer/CardsContainer";
import Paginado from "../paginado/Paginado";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllProductsAction } from "../../../redux/actionsProducts";

const ViewCatalogue = () => {
  const { user } = useSelector((state) => state.user);
  const localUser = JSON.parse(localStorage.getItem("user"));
  const dataUser = localUser ? localUser : user;
  const { products } = useSelector((state) => state.products);
  const { company } = useSelector((state) => state.company);

  // Check if user and user.companyID exist, if not set companyId to null or some default value
  //const companyId = user?.companyID || null;
  console.log(company._id)
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  console.log("PRODUCTS GET ALL in view CATALOGO", products);

  useEffect(() => {
    // Check if companyId is not null before dispatching the action
    if (dataUser) {
      dispatch(getAllProductsAction(company._id));
    }
  }, [dispatch, dataUser]);

  return (
    <div className="mx-10" style={{ width: "100vw" }}>
      <div className="mt-10 ml-10">
        <ButtonBack />
      </div>
      <HeaderCatalogue setSearchQuery={setSearchQuery} />
      <CardsContainer searchQuery={searchQuery} />
      <Paginado />
    </div>
  );
};

export default ViewCatalogue;