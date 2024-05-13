import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Detail from "../Detail/Detail";
import ButtonBack from "../Utils/Buttons/ButtonBack";
import Spinner from "../Utils/Spinner";
import { getProductDetailAction } from "../../redux/actionsProducts";
import { getCompanyAction } from "../../redux/actionsCompany";

const DetailsProduct = () => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);
    const userLocal = JSON.parse(localStorage.getItem("user"));

    const companyId = userLocal ? userLocal.companyID[0] : user.companyID;

    //const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    //const userLocal = JSON.parse(localStorage.getItem('user'));

    //const companyId = userLocal ? userLocal.companyID[0] : user.companyID;
    //const companyId = user.companyID;
    //console.log(" COMPAÑIA: ", companyId);
    const { detailId } = useParams();
    console.log("ID PRODUCTO: ", detailId);
    //const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const localUser = JSON.parse(localStorage.getItem("user"));
        const dataUser = localUser ? localUser : user;
        console.log(dataUser)
        if (dataUser) {
            console.log(dataUser)
            dispatch(getProductDetailAction(localUser.detailId, localUser.companyID));
            dispatch(getCompanyAction(localUser.companyID));
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }
    }, [dispatch, companyId, user, isLoading]);


    return (
        <div className="w-10/12 h-50 bg-white rounded-2xl mx-auto">
            {isLoading ? <Spinner /> :
                <div>
                    <Detail />
                    <div className="px-10 pb-10">
                        <ButtonBack />
                    </div>
                </div>
            }
        </div>
    )
}

export default DetailsProduct;