import React from "react";
import { useSelector } from "react-redux";
import logoFlecha from "../../assets/Imagenes/logoFlecha.png"

const Detail = () => {

    const productDetail = useSelector(state => state.products.productDetail);
    console.log("DETALLE: ", productDetail);
    const company = useSelector(state => state.company.company);
    const logo = company?.image?.url ? company?.image?.url : logoFlecha



    return (
        <div>

            <div className="grid grid-cols-2  m-10 ">
                <img className="m-10 mt-16 w-10/12 max-h-52 rounded-xl shadow shadow-gray-400" src={productDetail.image.url} alt={`imagen de ${productDetail.name}`} />
                <div>
                    <div className="grid grid-cols-4">
                        <img className="w-32 h-auto rounded-full mt-6 " src={logo} alt="imagen flecha" />
                        <div className="col-span-3 my-7">
                            <h1 className="text-3xl text-gray-500 font-barlow-condensed font-semibold">Details of {productDetail.name}</h1>
                            <div className="flex flex-row justify-evenly text-lg font-roboto pt-2">
                                {productDetail.category.length && productDetail.category.map((c, index) => <h3 key={index} >{c}</h3>)}
                            </div>
                        </div>

                        <p className="font-roboto border border-gray-200 rounded-xl col-span-3 col-end-5 text-sm p-4 mr-10 mb-6 -mt-2 shadow shadow-gray-400">{productDetail.description}</p>
                    </div>
                    <div className="flex flex-row justify-evenly ml-18 mt-4 text-lg font-semibold text-[#00bcd4]">
                        <h3>Available Stock: {productDetail.quantity}</h3>
                        <h3>Price: {productDetail.price} {productDetail.currency}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail;